import csv

file = open("faculty-data.csv", 'r')
print(file)
reader = csv.reader(file, delimiter='#')
cols = [
    'id',
    'empId',
    'firstName',
    'middleName',
    'lastName',
    'gender',
    'doj',
    'emailAddress',
    'phoneNumber',
    'designation',
    'primaryDepartment',
    'secondaryDepartment',
    'role',
    'phd',
    'researchAreas'
]
columnString = "("
for col in cols:
    columnString += col + ','
columnString = columnString[ : -1] + ')'
# print(columnString)
nonStringFields = ['id']

data_dict = []
faculty_insert_queries = []
auth_insert_queries = []
default_password = "$2a$10$D3rbvQYdYPtk25P9x78Z5enIGorvQflogUIvIWPvTraUp6Dabo.A2"

for i, line in enumerate(reader):
    for j in range(len(line)):
        line[j] = line[j].strip()
    
    fields = ""
    current_dict = {}
    for j, value in enumerate(line):
        current = ""
        if cols[j] == 'doj':
            line[j] = f"{line[j][6 : ]}-{line[j][3 : 5]}-{line[j][ : 2]}"
        if cols[j] in nonStringFields:
            fields += f"{line[j]}"
            current = line[j]
        else:
            if "'" in line[j]:
                fields += f'"{line[j]}"'
                current = f'"{line[j]}"'
            else:
                fields += f"'{line[j]}'"
                current = f"'{line[j]}'"
        current_dict[cols[j]] = current
        fields += ','
    data_dict.append(current_dict)
    fields = fields[ : -1]
    query = f"INSERT INTO faculty {columnString} VALUES "
    query += f"({fields});"
    # print(query)

for user in data_dict:
    role = user['role']
    emailAddress = user['emailAddress']
    if role == "''":
        role = "'prof'"
    query = f"INSERT INTO auth VALUES ({emailAddress}, '{default_password}', {user['id']}, {role});"
    print(query)