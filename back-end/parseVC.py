__author__ = 'lizhengning1'
from pymongo import MongoClient
import datetime
import openpyxl
import xlrd as xl
import requests
from flask import Flask, jsonify

vxls = openpyxl.load_workbook('VC.xlsx')

