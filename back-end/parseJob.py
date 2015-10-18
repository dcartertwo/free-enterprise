__author__ = 'lizhengning1'

# sheet = wb.get_sheet_by_name('AL')
# print sheet['A10'].value
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
import openpyxl
import xlrd as xl
wb = openpyxl.load_workbook('Job.xlsx')
datalist = []
xls = xl.open_workbook('Job.xlsx')
for key in states:
    if key in xls.sheet_names():
        sheet = wb.get_sheet_by_name(key)
        i = 5
        while i < 125:
            # print sheet['A' + str(i)].value
            original = sheet['B' + str(i)].value
            current = sheet['B' + str(i + 12)].value
            increase = float(current - original) / original
            datalist.append(increase)
            data = {"states": key,
            "JobGrowthRate": datalist}
            i = i + 12
        datalist = []
        # print sheet['A' + str(i)].value
        # print sheet['A' + str(i + 6)].value
    else:
        data = {"states": key,
                "JobGrowthRate": "Null"}
