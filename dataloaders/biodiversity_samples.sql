-- Table: belly_button.biodiversity_samples

-- DROP TABLE belly_button.biodiversity_samples;

CREATE TABLE belly_button.biodiversity_samples
(
    otu_id integer NOT NULL,
    sample integer[],
    CONSTRAINT biodiversity_samples_pkey PRIMARY KEY (otu_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE belly_button.biodiversity_samples
    OWNER to postgres;

GRANT ALL ON TABLE belly_button.biodiversity_samples TO postgres;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE belly_button.biodiversity_samples TO PUBLIC;