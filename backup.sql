--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

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
-- Name: adoption_applications; Type: TABLE; Schema: public; Owner: woofusai
--

CREATE TABLE public.adoption_applications (
    id integer NOT NULL,
    user_id integer,
    pet_api_id character varying(50) NOT NULL,
    pet_name character varying(100),
    message text,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.adoption_applications OWNER TO woofusai;

--
-- Name: adoption_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: woofusai
--

CREATE SEQUENCE public.adoption_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adoption_applications_id_seq OWNER TO woofusai;

--
-- Name: adoption_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: woofusai
--

ALTER SEQUENCE public.adoption_applications_id_seq OWNED BY public.adoption_applications.id;


--
-- Name: cached_animals; Type: TABLE; Schema: public; Owner: woofusai
--

CREATE TABLE public.cached_animals (
    id integer NOT NULL,
    api_id character varying(50) NOT NULL,
    name character varying(100),
    type character varying(50),
    breed character varying(100),
    age character varying(20),
    gender character varying(20),
    size character varying(20),
    location character varying(100),
    description text,
    photos jsonb,
    contact_info jsonb,
    api_data jsonb,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_available boolean DEFAULT true
);


ALTER TABLE public.cached_animals OWNER TO woofusai;

--
-- Name: cached_animals_id_seq; Type: SEQUENCE; Schema: public; Owner: woofusai
--

CREATE SEQUENCE public.cached_animals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cached_animals_id_seq OWNER TO woofusai;

--
-- Name: cached_animals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: woofusai
--

ALTER SEQUENCE public.cached_animals_id_seq OWNED BY public.cached_animals.id;


--
-- Name: favorite_pets; Type: TABLE; Schema: public; Owner: woofusai
--

CREATE TABLE public.favorite_pets (
    id integer NOT NULL,
    user_id integer,
    pet_api_id character varying(50) NOT NULL,
    pet_name character varying(100),
    pet_type character varying(50),
    pet_breed character varying(100),
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favorite_pets OWNER TO woofusai;

--
-- Name: favorite_pets_id_seq; Type: SEQUENCE; Schema: public; Owner: woofusai
--

CREATE SEQUENCE public.favorite_pets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorite_pets_id_seq OWNER TO woofusai;

--
-- Name: favorite_pets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: woofusai
--

ALTER SEQUENCE public.favorite_pets_id_seq OWNED BY public.favorite_pets.id;


--
-- Name: popular_searches; Type: TABLE; Schema: public; Owner: woofusai
--

CREATE TABLE public.popular_searches (
    id integer NOT NULL,
    search_term character varying(100) NOT NULL,
    search_count integer DEFAULT 1,
    last_searched timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.popular_searches OWNER TO woofusai;

--
-- Name: popular_searches_id_seq; Type: SEQUENCE; Schema: public; Owner: woofusai
--

CREATE SEQUENCE public.popular_searches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.popular_searches_id_seq OWNER TO woofusai;

--
-- Name: popular_searches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: woofusai
--

ALTER SEQUENCE public.popular_searches_id_seq OWNED BY public.popular_searches.id;


--
-- Name: search_history; Type: TABLE; Schema: public; Owner: woofusai
--

CREATE TABLE public.search_history (
    id integer NOT NULL,
    user_id integer,
    search_type character varying(50),
    search_location character varying(100),
    search_filters jsonb,
    results_count integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.search_history OWNER TO woofusai;

--
-- Name: search_history_id_seq; Type: SEQUENCE; Schema: public; Owner: woofusai
--

CREATE SEQUENCE public.search_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.search_history_id_seq OWNER TO woofusai;

--
-- Name: search_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: woofusai
--

ALTER SEQUENCE public.search_history_id_seq OWNED BY public.search_history.id;


--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: woofusai
--

CREATE TABLE public.user_sessions (
    id integer NOT NULL,
    user_id integer,
    session_token character varying(255) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_sessions OWNER TO woofusai;

--
-- Name: user_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: woofusai
--

CREATE SEQUENCE public.user_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_sessions_id_seq OWNER TO woofusai;

--
-- Name: user_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: woofusai
--

ALTER SEQUENCE public.user_sessions_id_seq OWNED BY public.user_sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: woofusai
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    phone character varying(20),
    address text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO woofusai;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: woofusai
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO woofusai;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: woofusai
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: adoption_applications id; Type: DEFAULT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.adoption_applications ALTER COLUMN id SET DEFAULT nextval('public.adoption_applications_id_seq'::regclass);


--
-- Name: cached_animals id; Type: DEFAULT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.cached_animals ALTER COLUMN id SET DEFAULT nextval('public.cached_animals_id_seq'::regclass);


--
-- Name: favorite_pets id; Type: DEFAULT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.favorite_pets ALTER COLUMN id SET DEFAULT nextval('public.favorite_pets_id_seq'::regclass);


--
-- Name: popular_searches id; Type: DEFAULT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.popular_searches ALTER COLUMN id SET DEFAULT nextval('public.popular_searches_id_seq'::regclass);


--
-- Name: search_history id; Type: DEFAULT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.search_history ALTER COLUMN id SET DEFAULT nextval('public.search_history_id_seq'::regclass);


--
-- Name: user_sessions id; Type: DEFAULT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.user_sessions ALTER COLUMN id SET DEFAULT nextval('public.user_sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: adoption_applications; Type: TABLE DATA; Schema: public; Owner: woofusai
--

COPY public.adoption_applications (id, user_id, pet_api_id, pet_name, message, status, created_at) FROM stdin;
\.


--
-- Data for Name: cached_animals; Type: TABLE DATA; Schema: public; Owner: woofusai
--

COPY public.cached_animals (id, api_id, name, type, breed, age, gender, size, location, description, photos, contact_info, api_data, last_updated, is_available) FROM stdin;
1	79501117	Ash & Willow BONDED	Cat	Domestic Short Hair	Baby	Male	Small	Hartford	PLEASE READ ENTIRE LISTING,\nWe transport kittens from South Florida.  There is an epidemic of cat overpopulation in South Florida....	[{"full": "https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/image/6b1746d7-2562-43b0-b92e-6c668394c7c9.jpeg?versionId=RMcSQdkC5Ldb5MuGa6hrqTy3jbvK5K8k&bust=1763564898", "large": "https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/image/6b1746d7-2562-43b0-b92e-6c668394c7c9.jpeg?versionId=RMcSQdkC5Ldb5MuGa6hrqTy3jbvK5K8k&bust=1763564898&width=600", "small": "https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/image/6b1746d7-2562-43b0-b92e-6c668394c7c9.jpeg?versionId=RMcSQdkC5Ldb5MuGa6hrqTy3jbvK5K8k&bust=1763564898&width=100", "medium": "https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/image/6b1746d7-2562-43b0-b92e-6c668394c7c9.jpeg?versionId=RMcSQdkC5Ldb5MuGa6hrqTy3jbvK5K8k&bust=1763564898&width=300"}]	{"email": "changingtomorrowanimalrescue@gmail.com", "address": {"city": "Hartford", "state": "CT", "country": "US", "postcode": "06103"}}	{"id": 79501117, "age": "Baby", "url": "https://www.petfinder.com/cat/ash-and-willow-bonded-79501117/ct/hartford/changing-tomorrow-animal-rescue-inc-fl1770/?referrer_id=64178937-57e4-4b87-b362-ff3f18cce767&utm_source=api&utm_medium=partnership&utm_content=64178937-57e4-4b87-b362-ff3f18cce767", "coat": "Short", "name": "Ash & Willow BONDED", "size": "Small", "tags": ["Affectionate", "Athletic", "Brave", "Curious", "Friendly", "Funny", "Loves", "Loyal", "Playful", "Smart"], "type": "Cat", "_links": {"self": {"href": "/v2/animals/79501117"}, "type": {"coats": [], "colors": [], "genders": []}, "organization": {"href": "/v2/organizations/fl1770"}}, "breeds": {"mixed": true, "primary": "Domestic Short Hair", "unknown": false, "secondary": "Domestic Medium Hair"}, "colors": {"primary": "Calico", "secondary": "Gray & White"}, "gender": "Male", "photos": [{"full": "https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/image/6b1746d7-2562-43b0-b92e-6c668394c7c9.jpeg?versionId=RMcSQdkC5Ldb5MuGa6hrqTy3jbvK5K8k&bust=1763564898", "large": "https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/image/6b1746d7-2562-43b0-b92e-6c668394c7c9.jpeg?versionId=RMcSQdkC5Ldb5MuGa6hrqTy3jbvK5K8k&bust=1763564898&width=600", "small": "https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/image/6b1746d7-2562-43b0-b92e-6c668394c7c9.jpeg?versionId=RMcSQdkC5Ldb5MuGa6hrqTy3jbvK5K8k&bust=1763564898&width=100", "medium": "https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/image/6b1746d7-2562-43b0-b92e-6c668394c7c9.jpeg?versionId=RMcSQdkC5Ldb5MuGa6hrqTy3jbvK5K8k&bust=1763564898&width=300"}], "status": "adoptable", "videos": [{"embed": "<video controls><source src=\\"https://dbw3zep4prcju.cloudfront.net/animal/a72713f9-c7a4-4e30-bf86-1c918ccc04d3/video/b8d96e8d-1080-4194-99c0-829f6d28db8f.mp4?versionId=TQW3uQJ3pk27PmkvxN4Zyclq48wsdMdA\\" type=\\"video/mp4\\"></video>"}], "contact": {"email": "changingtomorrowanimalrescue@gmail.com", "address": {"city": "Hartford", "state": "CT", "country": "US", "postcode": "06103"}}, "species": "Cat", "attributes": {"declawed": false, "house_trained": true, "shots_current": true, "special_needs": false, "spayed_neutered": true}, "description": "PLEASE READ ENTIRE LISTING,\\nWe transport kittens from South Florida.  There is an epidemic of cat overpopulation in South Florida....", "environment": {"cats": true, "dogs": false, "children": false}, "published_at": 1763564917, "organization_id": "FL1770"}	2025-11-19 07:08:53.098771	t
2	79501115	Ash	Cat	Domestic Short Hair	Adult	Female	Large	Baraboo		[]	{"email": "shelter@saukhumane.org", "phone": "(608) 356-2520", "address": {"city": "Baraboo", "state": "WI", "country": "US", "address1": "618 Linn St. ", "postcode": "53913"}}	{"id": 79501115, "age": "Adult", "url": "https://www.petfinder.com/cat/ash-79501115/wi/baraboo/sauk-county-humane-society-wi77/?referrer_id=64178937-57e4-4b87-b362-ff3f18cce767&utm_source=api&utm_medium=partnership&utm_content=64178937-57e4-4b87-b362-ff3f18cce767", "name": "Ash", "size": "Large", "tags": [], "type": "Cat", "_links": {"self": {"href": "/v2/animals/79501115"}, "type": {"coats": [], "colors": [], "genders": []}, "organization": {"href": "/v2/organizations/wi77"}}, "breeds": {"mixed": false, "primary": "Domestic Short Hair", "unknown": false}, "colors": {}, "gender": "Female", "photos": [], "status": "adoptable", "videos": [], "contact": {"email": "shelter@saukhumane.org", "phone": "(608) 356-2520", "address": {"city": "Baraboo", "state": "WI", "country": "US", "address1": "618 Linn St. ", "postcode": "53913"}}, "species": "Cat", "attributes": {"declawed": true, "house_trained": false, "shots_current": false, "special_needs": false, "spayed_neutered": true}, "environment": {"cats": false, "dogs": false, "children": false}, "published_at": 1763564878, "organization_id": "WI77"}	2025-11-19 07:08:53.101962	t
3	79501114	Ash	Cat	Domestic Short Hair	Adult	Female	Large	Baraboo		[]	{"email": "shelter@saukhumane.org", "phone": "(608) 356-2520", "address": {"city": "Baraboo", "state": "WI", "country": "US", "address1": "618 Linn St. ", "postcode": "53913"}}	{"id": 79501114, "age": "Adult", "url": "https://www.petfinder.com/cat/ash-79501114/wi/baraboo/sauk-county-humane-society-wi77/?referrer_id=64178937-57e4-4b87-b362-ff3f18cce767&utm_source=api&utm_medium=partnership&utm_content=64178937-57e4-4b87-b362-ff3f18cce767", "name": "Ash", "size": "Large", "tags": [], "type": "Cat", "_links": {"self": {"href": "/v2/animals/79501114"}, "type": {"coats": [], "colors": [], "genders": []}, "organization": {"href": "/v2/organizations/wi77"}}, "breeds": {"mixed": false, "primary": "Domestic Short Hair", "unknown": false}, "colors": {}, "gender": "Female", "photos": [], "status": "adoptable", "videos": [], "contact": {"email": "shelter@saukhumane.org", "phone": "(608) 356-2520", "address": {"city": "Baraboo", "state": "WI", "country": "US", "address1": "618 Linn St. ", "postcode": "53913"}}, "species": "Cat", "attributes": {"declawed": true, "house_trained": false, "shots_current": false, "special_needs": false, "spayed_neutered": true}, "environment": {"cats": false, "dogs": false, "children": false}, "published_at": 1763564877, "organization_id": "WI77"}	2025-11-19 07:08:53.102825	t
\.


--
-- Data for Name: favorite_pets; Type: TABLE DATA; Schema: public; Owner: woofusai
--

COPY public.favorite_pets (id, user_id, pet_api_id, pet_name, pet_type, pet_breed, added_at) FROM stdin;
\.


--
-- Data for Name: popular_searches; Type: TABLE DATA; Schema: public; Owner: woofusai
--

COPY public.popular_searches (id, search_term, search_count, last_searched) FROM stdin;
1	cat_anywhere	1	2025-11-19 07:08:51.759088
\.


--
-- Data for Name: search_history; Type: TABLE DATA; Schema: public; Owner: woofusai
--

COPY public.search_history (id, user_id, search_type, search_location, search_filters, results_count, created_at) FROM stdin;
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: woofusai
--

COPY public.user_sessions (id, user_id, session_token, expires_at, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: woofusai
--

COPY public.users (id, username, email, password_hash, first_name, last_name, phone, address, created_at) FROM stdin;
1	testuser	test@example.com	$2b$10$example.hash.here	Test	User	\N	\N	2025-11-19 07:00:24.057108
2	demo	demo@test.com	$2b$10$9sQPlHKIPV7lNn2dCH8gc.yPCroHyGb77ETJAxjJGbMVPqEHXDwK2	Demo	User	\N	\N	2025-11-19 07:06:10.404243
\.


--
-- Name: adoption_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: woofusai
--

SELECT pg_catalog.setval('public.adoption_applications_id_seq', 1, false);


--
-- Name: cached_animals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: woofusai
--

SELECT pg_catalog.setval('public.cached_animals_id_seq', 3, true);


--
-- Name: favorite_pets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: woofusai
--

SELECT pg_catalog.setval('public.favorite_pets_id_seq', 1, false);


--
-- Name: popular_searches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: woofusai
--

SELECT pg_catalog.setval('public.popular_searches_id_seq', 1, true);


--
-- Name: search_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: woofusai
--

SELECT pg_catalog.setval('public.search_history_id_seq', 1, false);


--
-- Name: user_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: woofusai
--

SELECT pg_catalog.setval('public.user_sessions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: woofusai
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: adoption_applications adoption_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.adoption_applications
    ADD CONSTRAINT adoption_applications_pkey PRIMARY KEY (id);


--
-- Name: cached_animals cached_animals_api_id_key; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.cached_animals
    ADD CONSTRAINT cached_animals_api_id_key UNIQUE (api_id);


--
-- Name: cached_animals cached_animals_pkey; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.cached_animals
    ADD CONSTRAINT cached_animals_pkey PRIMARY KEY (id);


--
-- Name: favorite_pets favorite_pets_pkey; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.favorite_pets
    ADD CONSTRAINT favorite_pets_pkey PRIMARY KEY (id);


--
-- Name: favorite_pets favorite_pets_user_id_pet_api_id_key; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.favorite_pets
    ADD CONSTRAINT favorite_pets_user_id_pet_api_id_key UNIQUE (user_id, pet_api_id);


--
-- Name: popular_searches popular_searches_pkey; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.popular_searches
    ADD CONSTRAINT popular_searches_pkey PRIMARY KEY (id);


--
-- Name: popular_searches popular_searches_search_term_key; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.popular_searches
    ADD CONSTRAINT popular_searches_search_term_key UNIQUE (search_term);


--
-- Name: search_history search_history_pkey; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_pkey PRIMARY KEY (id);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: user_sessions user_sessions_session_token_key; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_session_token_key UNIQUE (session_token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: adoption_applications adoption_applications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.adoption_applications
    ADD CONSTRAINT adoption_applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: favorite_pets favorite_pets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.favorite_pets
    ADD CONSTRAINT favorite_pets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: search_history search_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_sessions user_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: woofusai
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

