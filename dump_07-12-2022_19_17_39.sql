--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;


--
-- Roles
--

CREATE ROLE password;
ALTER ROLE password WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:5hexKfsny0lNHdrc0U0eHA==$WXFga3BnvumQP4+4wLBxmatHYd3fOEbJwgvEDfdBZWw=:SO271Pqx5OhvOKevZgrAHajkw8F97psvi+0oZwzlAoo=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: password
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO password;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: password
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: password
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: password
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "parkir" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: parkir; Type: DATABASE; Schema: -; Owner: password
--

CREATE DATABASE parkir WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE parkir OWNER TO password;

\connect parkir

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: parking; Type: TABLE; Schema: public; Owner: password
--

CREATE TABLE public.parking (
    id integer NOT NULL,
    plate character varying(255),
    type_id integer,
    clock_in timestamp with time zone,
    clock_out timestamp with time zone,
    amount integer,
    description character varying(255),
    status boolean DEFAULT true
);


ALTER TABLE public.parking OWNER TO password;

--
-- Name: parking_id_seq; Type: SEQUENCE; Schema: public; Owner: password
--

CREATE SEQUENCE public.parking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parking_id_seq OWNER TO password;

--
-- Name: parking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: password
--

ALTER SEQUENCE public.parking_id_seq OWNED BY public.parking.id;


--
-- Name: transportType; Type: TABLE; Schema: public; Owner: password
--

CREATE TABLE public."transportType" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    status boolean DEFAULT true
);


ALTER TABLE public."transportType" OWNER TO password;

--
-- Name: transportType_id_seq; Type: SEQUENCE; Schema: public; Owner: password
--

CREATE SEQUENCE public."transportType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."transportType_id_seq" OWNER TO password;

--
-- Name: transportType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: password
--

ALTER SEQUENCE public."transportType_id_seq" OWNED BY public."transportType".id;


--
-- Name: parking id; Type: DEFAULT; Schema: public; Owner: password
--

ALTER TABLE ONLY public.parking ALTER COLUMN id SET DEFAULT nextval('public.parking_id_seq'::regclass);


--
-- Name: transportType id; Type: DEFAULT; Schema: public; Owner: password
--

ALTER TABLE ONLY public."transportType" ALTER COLUMN id SET DEFAULT nextval('public."transportType_id_seq"'::regclass);


--
-- Data for Name: parking; Type: TABLE DATA; Schema: public; Owner: password
--

COPY public.parking (id, plate, type_id, clock_in, clock_out, amount, description, status) FROM stdin;
2	AC 1234 MTR	2	2022-11-02 03:10:10+00	\N	0	\N	t
1	AC 1234 ASD	2	2022-11-02 03:10:10+00	2022-11-02 11:00:00+00	2000	\N	f
\.


--
-- Data for Name: transportType; Type: TABLE DATA; Schema: public; Owner: password
--

COPY public."transportType" (id, name, description, status) FROM stdin;
2	motor	\N	t
1	mobil	for mobil	t
\.


--
-- Name: parking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: password
--

SELECT pg_catalog.setval('public.parking_id_seq', 4, true);


--
-- Name: transportType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: password
--

SELECT pg_catalog.setval('public."transportType_id_seq"', 3, true);


--
-- Name: parking parking_pkey; Type: CONSTRAINT; Schema: public; Owner: password
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_pkey PRIMARY KEY (id);


--
-- Name: transportType transportType_pkey; Type: CONSTRAINT; Schema: public; Owner: password
--

ALTER TABLE ONLY public."transportType"
    ADD CONSTRAINT "transportType_pkey" PRIMARY KEY (id);


--
-- Name: parking parking_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: password
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_type_id_fkey FOREIGN KEY (type_id) REFERENCES public."transportType"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: password
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO password;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: password
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

