-- Table: belly_button.biodiversity_otu_id

-- DROP TABLE belly_button.biodiversity_otu_id;

CREATE TABLE belly_button.biodiversity_otu_id
(
    otu_id integer NOT NULL,
    lowest_taxonomic_unit_found text COLLATE pg_catalog."default",
    CONSTRAINT biodiversity_otu_id_pkey PRIMARY KEY (otu_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE belly_button.biodiversity_otu_id
    OWNER to postgres;

GRANT ALL ON TABLE belly_button.biodiversity_otu_id TO postgres;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE belly_button.biodiversity_otu_id TO PUBLIC;