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

CREATE TABLE public."transportType" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    status boolean DEFAULT true
);

-
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

