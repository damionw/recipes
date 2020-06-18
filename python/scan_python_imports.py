import ast
from stat import S_ISREG, ST_MODE
from os import listdir, stat, walk
from os.path import join, splitext, dirname, relpath
from collections import namedtuple
import pandas as pd

Import = namedtuple("Import", ["module", "name", "alias"])

def get_imports(path):
    with open(path) as fh:        
       root = ast.parse(fh.read(), path)

    for node in ast.iter_child_nodes(root):
        if isinstance(node, ast.Import):
            module = []
        elif isinstance(node, ast.ImportFrom):
            if node.module is None:
                module = join(dirname(path), "__init__.py").split(".")
            else:
                module = node.module.split('.')
        else:
            continue

        for n in node.names:
            yield Import(module, n.name.split('.'), n.asname)

def get_python_modules(path):
    for root, dirs, files in walk(path):
        for _file in files:
            fullpath = join(root, _file)

            if S_ISREG(stat(fullpath).st_mode) and splitext(_file)[1] == ".py":
                yield fullpath

df = pd.DataFrame(
    [
        [
            relpath(_source, _checkout),
            ".".join(_import.module),
            _dep
        ]
        for _checkout in ["/checkouts/project_name"]
        for _source in get_python_modules(checkout)
        for _import in get_imports(_source)
        for _dep in _import.name
    ],
    
    columns=[
        "file",
        "module",
        "object"
    ]
).sort(
    columns=[
        "file",
        "module",
        "object",
    ]
)
