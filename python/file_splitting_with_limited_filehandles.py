#!/usr/bin/env python

from sys import argv
from os.path import dirname, basename, splitext
from random import random
import logging

class fdproxy(object):
    limit = 20
    _proxies = {}

    @classmethod
    def get_fd(cls, filename):
        return cls._proxies.setdefault(filename, cls(filename)).fd

    def __init__(self, filename):
        self._proxies[filename] = self
        self._filename = filename
        self._fd = None
        self._initial = True

    def __del__(self):
        logging.warning("Removing {}".format(self._filename))
        self.deactivate()
        del self._proxies[self._filename]

    @property
    def is_active(self):
        return self._fd is not None

    @property
    def limit_reached(self):
        return (
            self.activated_count >= self.limit
        )

    @property
    def activated_proxies(self):
        return {
            _key: _proxy for _key, _proxy in self._proxies.items() if _proxy.is_active
        }

    @property
    def activated_count(self):
        return len(self.activated_proxies)

    @property
    def fd(self):
        if not self.is_active:
            if self.limit_reached:
                self.random_deactivate()

            if not self.limit_reached:
                self.activate()

        return self._fd

    def activate(self):
        self._fd = open(self._filename, "w" if self._initial else "w+")
        self._initial = False
        logging.warning("Writing to {} as fd {}. Count is {}".format(self._filename, self._fd.fileno(), self.activated_count))

    def deactivate(self):
        if not self.is_active:
            return

        logging.warning("Deactivating {} as fd {}. Count is {}".format(self._filename, self._fd.fileno(), self.activated_count))
        self._fd.close()
        self._fd = None
        
    def random_deactivate(self):
        list(self.activated_proxies.values())[int(random() * self.activated_count)].deactivate()

fdproxy.limit = 12
source_path = argv[1]
target_base, extension = splitext(source_path)

with open(source_path, "r") as fd:
    for row in fd:
        for key in row.split():
            key = key.split(",")[1].strip()
            break
        else:
            continue

        output_filename = "{}.{}{}".format(target_base, key, extension)
        fdproxy.get_fd(output_filename).write(row)
