
# Biodiversity

## Analysis of Source Data

### Analysis of metadata_columns.csv

* This file appears to be the table definition for the belly_button_biodiversity_metadata.csv.</li>

* It will be utilized in pgAdmin to create the biodiversity_metadata table in the belly_button of the postgres database.

### Analysis of belly_button_biodiversity_metadata.csv
* This contains the attributes of the test subjects.
* It will be used for for populating the biodiversity_metadata table in the belly_button schema of the postgres database.
* If the SAMPLEID row values are prepended with "BB_", they correspond to the column names of the belly_button_biodiversity_samples.csv file.
* The row number will be used as an index into the array of samples in the belly_button_biodiversity_samples data.

### Analysis of belly_button_biodiversity_samples.csv
* OTU is Opterational Taxonomic Unit.  
* It is an operational definition used to classify groups of closely related subjects.
* This table contains number of observations per tuple of OTU and Subject.
* It will be used to create table belly_button.biodiversity_samples.

### Analysis of belly_button_biodiversity_otu_id.csv
* This source contains the descriptions of the diseases.
* It is keyed by the samme otu_id found in the belly_button.biodiversity_samples table.
* It will be used to create the belly_button.biiodiversity_otu_id table.

## Database Design
![Entity Relationship Diagram](er.png)

## Functional Design

### Representative State Transfer (REST) Queries

```python
@app.route('/names')
    """List of sample names.

    Returns a list of sample names in the format
    [
        "BB_940",
        "BB_941",
        "BB_943",
        "BB_944",
        "BB_945",
        "BB_946",
        "BB_947",
        ...
    ]

    """
```
* Select all sampleid values from biodiversity_metadata table.
* Return the values as a list.

```python
@app.route('/otu')
    """List of OTU descriptions.

    Returns a list of OTU descriptions in the following format

    [
        "Archaea;Euryarchaeota;Halobacteria;Halobacteriales;Halobacteriaceae;Halococcus",
        "Archaea;Euryarchaeota;Halobacteria;Halobacteriales;Halobacteriaceae;Halococcus",
        "Bacteria",
        "Bacteria",
        "Bacteria",
        ...
    ]
    """
```
* Select all rows from the biodiversity_otu_id table.
* Return a list of lowest_taxonomic_unit found.

```python
@app.route('/metadata/<sample>')
    """MetaData for a given sample.

    Args: Sample in the format: `BB_940`

    Returns a json dictionary of sample metadata in the format

    {
        AGE: 24,
        BBTYPE: "I",
        ETHNICITY: "Caucasian",
        GENDER: "F",
        LOCATION: "Beaufort/NC",
        SAMPLEID: 940
    }
    """
```
* Select the row using <sample> as to match the sampleid.
* Return the select attributes as a json object.

```python
@app.route('/wfreq/<sample>')
    """Weekly Washing Frequency as a number.

    Args: Sample in the format: `BB_940`

    Returns an integer value for the weekly washing frequency `WFREQ`
    """
```
* Select the row using <sample> that matches the sampleid.
* Return the selected attribute as a json object.

```python
@app.route('/samples/<sample>')
    """OTU IDs and Sample Values for a given sample.

    Sort your Pandas DataFrame (OTU ID and Sample Value)
    in Descending Order by Sample Value

    Return a list of dictionaries containing sorted lists  for `otu_ids`
    and `sample_values`

    [
        {
            otu_ids: [
                1166,
                2858,
                481,
                ...
            ],
            sample_values: [
                163,
                126,
                113,
                ...
            ]
        }
    ]
    """
```
* Find the row number in bioversity_metadata using the <sample> that matches the sampleid.
* Select all the touples of otu_id and sample value from biodiversity_samples.
* Load the tuples into a pandas dataframe.
* Sort datafram by sample value.
* Format and return a list of json two json objects.

## Physical Design

### app.py
* Respond to the REST requests.
* Access a Postgress database.
** If the program is running locally, access the local database using environment variable LOCAL_POSTGRES.
** If the program is running on a remote server, access the AWS database using environment variable AWS_POSTGRES.

### dropdown_menu.js
* On window.load even, populate the sample dropdown list.
* For each item on the list, call each of the plotting programs on a click event.

### sample_metadata.js
* Using the sampleid parameter, get metadata using a REST call.
* Populate the metadata list.

### plot_bubble.js
* Using the sampleid parameter, get sample data using a REST call.
* Plot the bubble chart.

### plot_gauge.js
* Using the sampleid parameter, get sample data using a REST call.
* Plot the gauge chart.

## plot_pie.js
* Using the sampleid parameter, get the sample data using a REST call.
* Plot the pie chart.
