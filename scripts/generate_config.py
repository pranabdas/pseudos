#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Program: Script to generate configuration file.
@author: Pranab Das (GitHub: @pranabdas)

Steps:
- Download and place all UPF files in a directory
- Run this script from there
"""
import os
import re
import json


def generate_config(dirname):
    config = {}

    for filename in os.listdir(dirname):
        if filename.lower().endswith(".upf"):
            element = re.sub(r"[-,_]", ".", filename).split(".")[0].title()
            config.update({element: {"filename": filename}})

    with open("config.json", "w") as fp:
        json.dump(config, fp, indent=2, sort_keys=True)
        fp.write("\n")  # EOL at the end of file


if __name__ == "__main__":
    generate_config(".")
