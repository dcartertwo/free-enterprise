__author__ = 'lizhengning1'
from pymongo import MongoClient
import datetime
import openpyxl
import xlrd as xl
import requests
from flask import Flask, jsonify

vxls = openpyxl.load_workbook('VC.xlsx')

states = {
        'AK': 'Alaska',
        'AL': 'Alabama',
        'AR': 'Arkansas',
        'AZ': 'Arizona',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DC': 'District of Columbia',
        'DE': 'Delaware',
        'FL': 'Florida',
        'GA': 'Georgia',
        'HI': 'Hawaii',
        'IA': 'Iowa',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'MA': 'Massachusetts',
        'MD': 'Maryland',
        'ME': 'Maine',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MO': 'Missouri',
        'MS': 'Mississippi',
        'MT': 'Montana',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'NE': 'Nebraska',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NV': 'Nevada',
        'NY': 'New York',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PA': 'Pennsylvania',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VA': 'Virginia',
        'VT': 'Vermont',
        'WA': 'Washington',
        'WI': 'Wisconsin',
        'WV': 'West Virginia',
        'WY': 'Wyoming'
}
sheet = vxls.get_sheet_by_name('Sheet1')

datalist = []
tmplist = []

deallist = ['B', 'D', 'F', 'H', 'J', 'L']
amountlist = ['C','E','G','I','K','M']
for i in range(8, 60):
    data = {
        "states":"",
        "VCDeals":[]
    }
    data['states'] = sheet['A' + str(i)].value
    for k in range(0, 6):
        tmp = {
        "Deals":"",
        "Amount":""
        }
        tmp['Deals'] = sheet[deallist[k] + str(i)].value
        tmp['Amount'] = sheet[amountlist[k] + str(i)].value
        tmplist.append(tmp)
    data['VCDeals'] = tmplist
    datalist.append(data)
    tmplist = []
print datalist