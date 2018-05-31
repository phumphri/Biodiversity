-- Table: belly_button.biodiversity_metadata

-- DROP TABLE belly_button.biodiversity_metadata;

CREATE TABLE belly_button.biodiversity_metadata
(
    sampleid text COLLATE pg_catalog."default" NOT NULL,
    row_num integer NOT NULL,
    event text COLLATE pg_catalog."default",
    ethnicity text COLLATE pg_catalog."default",
    gender text COLLATE pg_catalog."default",
    age integer,
    wfreq integer,
    bbtype text COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default",
    country012 text COLLATE pg_catalog."default",
    country1319 text COLLATE pg_catalog."default",
    impsurace013 integer,
    npp013 double precision,
    mmaxtemp013 double precision,
    pfc013 double precision,
    impsurface1319 integer,
    npp1319 double precision,
    mmaxtemp1319 double precision,
    pfc1319 double precision,
    zip012 text COLLATE pg_catalog."default",
    zip1319 text COLLATE pg_catalog."default",
    CONSTRAINT biodiversity_metadata_pkey PRIMARY KEY (sampleid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE belly_button.biodiversity_metadata
    OWNER to postgres;

GRANT ALL ON TABLE belly_button.biodiversity_metadata TO postgres;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE belly_button.biodiversity_metadata TO PUBLIC;