
# coding: utf-8

# In[105]:


import psycopg2
import pandas as pd
import numpy as np
import math
import socket
import os
import json
import flask
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)


# In[ ]:


app = Flask(__name__)


# In[7]:


print("Defining connect_to_postgres()")
def connect_to_postgres():
    hostname = socket.gethostname()
    print("socket.hostname():", hostname)
    print("os.environ['LOCAL_POSTGRES]:", os.environ['LOCAL_POSTGRES'])
    try:
        if (hostname == 'XPS'):
            conn = psycopg2.connect(os.environ['LOCAL_POSTGRES'])
            print('Connection okay.')
            return conn
        else:
            conn = psycopg2.connect(os.environ['AWS_POSTGRES'])
            print('Connection okay.')
            return conn
    except Exception as e:
        print('Connection failed:', e)


# In[87]:


print("Defining query_postgres(sql).")
def query_postgres(sql):
    
    print('sql:', sql)
    
    conn = connect_to_postgres()
    
    try:
        cur = conn.cursor()
        print('Cursor okay.')
    except Exception as e:
        print('Cursor failed:', e)
        
    try:
        cur.execute(sql)
        print('SQL okay.')
    except Exception as e:
        print('SQL failed:', e)
        
    rows = cur.fetchall()
    
    disconnect_from_postgres(conn)
    
    return rows


# In[8]:


print("Defining disconnect_from_posgress(conn).")
def disconnect_from_postgres(conn):
    try:
        conn.close()
        print('Close okay.')
    except Exception as e:
        print('Close failed:', e)


# In[9]:


# Test postgres connection.
# conn = connect_to_postgres()
# disconnect_from_postgres(conn)


# In[184]:


@app.route("/")
def home():
    return render_template("index.html")
    


# In[186]:


print("Defining names.")
@app.route('/names')
def names():
    
    print("In names.")
        
    sql = "select sampleid from belly_button.biodiversity_metadata"
    
    rows = query_postgres(sql)

    list_names = []
    
    for row in rows:
        a = np.array(row)
        list_names.append(a[0])
    
        
    return jsonify(list_names)


# In[93]:


# print(names())


# In[77]:


print("Defining otu.")
@app.route('/otu')
def otu():
    
    print("In otu")
    
    sql = "select lowest_taxonomic_unit_found from belly_button.biodiversity_otu_id"
    
    rows = query_postgres(sql)

    list_lowest_taxonomic_unit_found = []
    
    for row in rows:
        a = np.array(row)
        list_lowest_taxonomic_unit_found.append(a[0])
    
        
    return jsonify(list_lowest_taxonomic_unit_found)
    


# In[92]:


# Test otu functions.
# print(otu())


# In[134]:


print("Defining metadata/<sample>.")
@app.route('/metadata/<sample>')
def metadata(sample):
    
    print("In metadata(" + sample + ")")
    
    sql = "select age, bbtype, ethnicity, gender, location, sampleid "
    sql = sql + "from belly_button.biodiversity_metadata "
    sql = sql + "where sampleid = '" + sample + "'"
    
    dict_metadata = {}
    
    rows = query_postgres(sql)

    if (len(rows) == 0):
        return dict_metadata
    
    list_sample = list(rows[0])
    
    dict_metadata["AGE"] = list_sample[0]
    dict_metadata["BBTYPE"] = list_sample[1]
    dict_metadata["ETHNICITY"] = list_sample[2]
    dict_metadata["GENDER"] = list_sample[3]
    dict_metadata["LOCATION"] = list_sample[4]
    dict_metadata["SAMPLEID"] = list_sample[5]
    
    return jsonify(dict_metadata)
    


# In[136]:


# metadata("BB_944")


# In[137]:


print("Defining wfreq(sample).")
@app.route('/wfreq/<sample>')
def wfreq(sample):
    
    print("In wfreq(" + sample + ")")
    
    sql = "select wfreq "
    sql = sql + "from belly_button.biodiversity_metadata "
    sql = sql + "where sampleid = '" + sample + "'"
    
    dict_metadata = {}
    
    rows = query_postgres(sql)

    if (len(rows) == 0):
        return dict_metadata
    
    list_sample = list(rows[0])
    
    dict_metadata["WFREQ"] = list_sample[0]
    
    return jsonify(dict_metadata)


# In[139]:


# wfreq("BB_944")


# In[181]:


print("Defining samples(sample)")

@app.route('/samples/<sample>')
def samples(sample):

    print("In samples(" + sample + ")")
    
    sql = "select row_num "
    sql = sql + "from belly_button.biodiversity_metadata "
    sql = sql + "where sampleid = '" + sample + "'"
    
    list_otu_id = []
    dict_out_id = {}
    dict_out_id['otu_ids'] = list_otu_id
    
    list_sample_values = []
    dict_sample_values = {}
    dict_sample_values['sample_values'] = list_sample_values
    
    list_samples = [dict_out_id, dict_sample_values]
    
    print('list_samples:', list_samples)
    
    rows = query_postgres(sql)

    if (len(rows) == 0):
        return dict_samples
    
    sample_index = list(rows[0])[0]
    
    sql = "select otu_id, sample[" + str(sample_index) + "] "
    sql = sql + "from belly_button.biodiversity_samples "
    sql = sql + " order by sample[" + str(sample_index) + "] desc"
    
    rows = query_postgres(sql)
    
    if (len(rows) == 0):
        return dict_samples
    
    for row in rows:
        list_row = list(row)
#         print(list_row)
        list_otu_id.append(list_row[0])
        list_sample_values.append(list_row[1])
    
    dict_out_id['otu_ids'] = list_otu_id
    dict_sample_values['sample_values'] = list_sample_values
    
    list_samples = [dict_out_id, dict_sample_values]
    
    return jsonify(list_samples)


# In[183]:


# samples('BB_944')


# In[ ]:


if __name__ == "__main__":
    # app.run(debug=True)
    from os import environ
    print("Port", environ.get("PORT", "Not Found"))
    app.run(debug=False, host='0.0.0.0', port=int(environ.get("PORT", 5000)))
