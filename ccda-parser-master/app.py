#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# import pyCCDA 
import os
import unittest
import json 
from flask import Flask, jsonify, request
from pyCCDA.__init__ import CCDA
from flask_cors import CORS
import pandas as pd


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def replace_codes_recursive(data, code_dict):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == "code" and value in code_dict:
                data["name"] = code_dict[value]
        for key, value in data.items():
            if isinstance(value, (dict, list)):
                data[key] = replace_codes_recursive(value, code_dict)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            data[i] = replace_codes_recursive(item, code_dict)
    return data

@app.route("/", methods=['GET'])
def return_doc_list():
    user_directory = request.args.get('directory')
    directory = os.path.join(os.path.dirname(__file__), user_directory)
    
    doc_list = []
    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        if filename.endswith(".XML") or filename.endswith(".xml"):
            fp = os.path.join(directory, filename)
            with open(fp) as f:
                ccd = CCDA(f.read())
                if ccd.data is not None:
                    json_data = ccd.data.json()
                    doc_list.append(json_data)
                else:
                    print(f"{filename} was not successfully added")
    response = jsonify(doc_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    app.run(debug=True)
