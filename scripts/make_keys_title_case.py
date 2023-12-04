#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Program: Script to make keys in a json file title case because element names/
chemical symbols are expected to be title case (e.g., Fe, Mn, O etc.)
@author: Pranab Das (GitHub: @pranabdas)

Run:
python3 -i make_keys_title_case.py
>>> make_keys_title_case("file.json")
"""
import json


def make_keys_title_case(fname):
    with open(fname, "r") as fp:
        dict = json.loads(fp.read())

    config = {}

    for key in dict:
        config.update({key.title(): dict[key]})
        if key.title() != key:
            print("Not in title case:", key)

    if dict != config:
        if fname[-5:] == ".json":
            outfile = fname[:-5] + "_new.json"
        else:
            outfile = fname + ".json"

        with open(outfile, "w") as fp:
            json.dump(config, fp, indent=2, sort_keys=True)
            fp.write("\n")  # EOL at the end of file

        print("New file written to:", outfile)
    else:
        print("All keys are title case already!")
