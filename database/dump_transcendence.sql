--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 15.2 (Ubuntu 15.2-1.pgdg20.04+1)

-- Started on 2023-04-25 13:04:31 WEST

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
-- TOC entry 4344 (class 1262 OID 16403)
-- Name: transcendence; Type: DATABASE; Schema: -; Owner: transcendence_user
--

CREATE DATABASE transcendence WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


ALTER DATABASE transcendence OWNER TO transcendence_user;

\connect transcendence

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: transcendence_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO transcendence_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24605)
-- Name: achievements; Type: TABLE; Schema: public; Owner: transcendence_user
--

CREATE TABLE public.achievements (
    achievements_id integer NOT NULL,
    name character varying(255),
    image character varying(255),
    description character varying(255),
    condition_to_win character varying(255),
    rewards character varying(255)
);


ALTER TABLE public.achievements OWNER TO transcendence_user;

--
-- TOC entry 217 (class 1259 OID 24604)
-- Name: achievements_achievements_id_seq; Type: SEQUENCE; Schema: public; Owner: transcendence_user
--

CREATE SEQUENCE public.achievements_achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.achievements_achievements_id_seq OWNER TO transcendence_user;

--
-- TOC entry 4347 (class 0 OID 0)
-- Dependencies: 217
-- Name: achievements_achievements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transcendence_user
--

ALTER SEQUENCE public.achievements_achievements_id_seq OWNED BY public.achievements.achievements_id;


--
-- TOC entry 214 (class 1259 OID 16441)
-- Name: channels; Type: TABLE; Schema: public; Owner: transcendence_user
--

CREATE TABLE public.channels (
    channel_id integer NOT NULL,
    type smallint NOT NULL,
    password character varying(255),
    channel_owner integer,
    blocked_users character varying(255),
    administrators character varying(255),
    kicked character varying(255),
    banned character varying(255),
    muted character varying(255),
    messages character varying(255)[]
);


ALTER TABLE public.channels OWNER TO transcendence_user;

--
-- TOC entry 213 (class 1259 OID 16440)
-- Name: channels_channel_id_seq; Type: SEQUENCE; Schema: public; Owner: transcendence_user
--

CREATE SEQUENCE public.channels_channel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channels_channel_id_seq OWNER TO transcendence_user;

--
-- TOC entry 4348 (class 0 OID 0)
-- Dependencies: 213
-- Name: channels_channel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transcendence_user
--

ALTER SEQUENCE public.channels_channel_id_seq OWNED BY public.channels.channel_id;


--
-- TOC entry 216 (class 1259 OID 24588)
-- Name: chat; Type: TABLE; Schema: public; Owner: transcendence_user
--

CREATE TABLE public.chat (
    chat_id integer NOT NULL,
    sender integer NOT NULL,
    receiver integer NOT NULL,
    message character varying(255),
    date_hour timestamp with time zone NOT NULL,
    channel integer NOT NULL
);


ALTER TABLE public.chat OWNER TO transcendence_user;

--
-- TOC entry 215 (class 1259 OID 24587)
-- Name: chat_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: transcendence_user
--

CREATE SEQUENCE public.chat_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_chat_id_seq OWNER TO transcendence_user;

--
-- TOC entry 4349 (class 0 OID 0)
-- Dependencies: 215
-- Name: chat_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transcendence_user
--

ALTER SEQUENCE public.chat_chat_id_seq OWNED BY public.chat.chat_id;


--
-- TOC entry 220 (class 1259 OID 24614)
-- Name: maps; Type: TABLE; Schema: public; Owner: transcendence_user
--

CREATE TABLE public.maps (
    map_id integer NOT NULL,
    name character varying(255),
    texture character varying(255),
    condition_to_win character varying(255)
);


ALTER TABLE public.maps OWNER TO transcendence_user;

--
-- TOC entry 219 (class 1259 OID 24613)
-- Name: maps_map_id_seq; Type: SEQUENCE; Schema: public; Owner: transcendence_user
--

CREATE SEQUENCE public.maps_map_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maps_map_id_seq OWNER TO transcendence_user;

--
-- TOC entry 4350 (class 0 OID 0)
-- Dependencies: 219
-- Name: maps_map_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transcendence_user
--

ALTER SEQUENCE public.maps_map_id_seq OWNED BY public.maps.map_id;


--
-- TOC entry 210 (class 1259 OID 16408)
-- Name: match_history; Type: TABLE; Schema: public; Owner: transcendence_user
--

CREATE TABLE public.match_history (
    match_id integer NOT NULL,
    "time" timestamp with time zone NOT NULL,
    user_id_win integer NOT NULL,
    user_id_loser integer NOT NULL,
    points integer
);


ALTER TABLE public.match_history OWNER TO transcendence_user;

--
-- TOC entry 209 (class 1259 OID 16407)
-- Name: match_history_match_id_seq; Type: SEQUENCE; Schema: public; Owner: transcendence_user
--

CREATE SEQUENCE public.match_history_match_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.match_history_match_id_seq OWNER TO transcendence_user;

--
-- TOC entry 4351 (class 0 OID 0)
-- Dependencies: 209
-- Name: match_history_match_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transcendence_user
--

ALTER SEQUENCE public.match_history_match_id_seq OWNED BY public.match_history.match_id;


--
-- TOC entry 222 (class 1259 OID 24623)
-- Name: skins; Type: TABLE; Schema: public; Owner: transcendence_user
--

CREATE TABLE public.skins (
    skin_id integer NOT NULL,
    name character varying(255),
    texture character varying(255),
    condition_to_win character varying(255)
);


ALTER TABLE public.skins OWNER TO transcendence_user;

--
-- TOC entry 221 (class 1259 OID 24622)
-- Name: skins_skin_id_seq; Type: SEQUENCE; Schema: public; Owner: transcendence_user
--

CREATE SEQUENCE public.skins_skin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skins_skin_id_seq OWNER TO transcendence_user;

--
-- TOC entry 4352 (class 0 OID 0)
-- Dependencies: 221
-- Name: skins_skin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transcendence_user
--

ALTER SEQUENCE public.skins_skin_id_seq OWNED BY public.skins.skin_id;


--
-- TOC entry 212 (class 1259 OID 16415)
-- Name: users; Type: TABLE; Schema: public; Owner: transcendence_user
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    nick character varying(255) NOT NULL,
    password character varying(255),
    avatar character varying(255),
    loss_win_games character varying(255),
    xp_total integer,
    achievements character varying(255),
    maps_skins character varying(255),
    status smallint,
    creation_date timestamp with time zone,
    last_joined timestamp with time zone,
    email character varying(255)
);


ALTER TABLE public.users OWNER TO transcendence_user;

--
-- TOC entry 211 (class 1259 OID 16414)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: transcendence_user
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO transcendence_user;

--
-- TOC entry 4353 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: transcendence_user
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4161 (class 2604 OID 24608)
-- Name: achievements achievements_id; Type: DEFAULT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.achievements ALTER COLUMN achievements_id SET DEFAULT nextval('public.achievements_achievements_id_seq'::regclass);


--
-- TOC entry 4159 (class 2604 OID 16444)
-- Name: channels channel_id; Type: DEFAULT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.channels ALTER COLUMN channel_id SET DEFAULT nextval('public.channels_channel_id_seq'::regclass);


--
-- TOC entry 4160 (class 2604 OID 24591)
-- Name: chat chat_id; Type: DEFAULT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.chat ALTER COLUMN chat_id SET DEFAULT nextval('public.chat_chat_id_seq'::regclass);


--
-- TOC entry 4162 (class 2604 OID 24617)
-- Name: maps map_id; Type: DEFAULT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.maps ALTER COLUMN map_id SET DEFAULT nextval('public.maps_map_id_seq'::regclass);


--
-- TOC entry 4157 (class 2604 OID 16411)
-- Name: match_history match_id; Type: DEFAULT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.match_history ALTER COLUMN match_id SET DEFAULT nextval('public.match_history_match_id_seq'::regclass);


--
-- TOC entry 4163 (class 2604 OID 24626)
-- Name: skins skin_id; Type: DEFAULT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.skins ALTER COLUMN skin_id SET DEFAULT nextval('public.skins_skin_id_seq'::regclass);


--
-- TOC entry 4158 (class 2604 OID 16418)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4334 (class 0 OID 24605)
-- Dependencies: 218
-- Data for Name: achievements; Type: TABLE DATA; Schema: public; Owner: transcendence_user
--



--
-- TOC entry 4330 (class 0 OID 16441)
-- Dependencies: 214
-- Data for Name: channels; Type: TABLE DATA; Schema: public; Owner: transcendence_user
--



--
-- TOC entry 4332 (class 0 OID 24588)
-- Dependencies: 216
-- Data for Name: chat; Type: TABLE DATA; Schema: public; Owner: transcendence_user
--



--
-- TOC entry 4336 (class 0 OID 24614)
-- Dependencies: 220
-- Data for Name: maps; Type: TABLE DATA; Schema: public; Owner: transcendence_user
--



--
-- TOC entry 4326 (class 0 OID 16408)
-- Dependencies: 210
-- Data for Name: match_history; Type: TABLE DATA; Schema: public; Owner: transcendence_user
--



--
-- TOC entry 4338 (class 0 OID 24623)
-- Dependencies: 222
-- Data for Name: skins; Type: TABLE DATA; Schema: public; Owner: transcendence_user
--



--
-- TOC entry 4328 (class 0 OID 16415)
-- Dependencies: 212
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: transcendence_user
--



--
-- TOC entry 4354 (class 0 OID 0)
-- Dependencies: 217
-- Name: achievements_achievements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transcendence_user
--

SELECT pg_catalog.setval('public.achievements_achievements_id_seq', 1, false);


--
-- TOC entry 4355 (class 0 OID 0)
-- Dependencies: 213
-- Name: channels_channel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transcendence_user
--

SELECT pg_catalog.setval('public.channels_channel_id_seq', 1, false);


--
-- TOC entry 4356 (class 0 OID 0)
-- Dependencies: 215
-- Name: chat_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transcendence_user
--

SELECT pg_catalog.setval('public.chat_chat_id_seq', 1, false);


--
-- TOC entry 4357 (class 0 OID 0)
-- Dependencies: 219
-- Name: maps_map_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transcendence_user
--

SELECT pg_catalog.setval('public.maps_map_id_seq', 1, false);


--
-- TOC entry 4358 (class 0 OID 0)
-- Dependencies: 209
-- Name: match_history_match_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transcendence_user
--

SELECT pg_catalog.setval('public.match_history_match_id_seq', 1, false);


--
-- TOC entry 4359 (class 0 OID 0)
-- Dependencies: 221
-- Name: skins_skin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transcendence_user
--

SELECT pg_catalog.setval('public.skins_skin_id_seq', 1, false);


--
-- TOC entry 4360 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: transcendence_user
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- TOC entry 4175 (class 2606 OID 24612)
-- Name: achievements achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_pkey PRIMARY KEY (achievements_id);


--
-- TOC entry 4171 (class 2606 OID 16448)
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (channel_id);


--
-- TOC entry 4173 (class 2606 OID 24593)
-- Name: chat chat_pkey; Type: CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY (chat_id);


--
-- TOC entry 4177 (class 2606 OID 24621)
-- Name: maps maps_pkey; Type: CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.maps
    ADD CONSTRAINT maps_pkey PRIMARY KEY (map_id);


--
-- TOC entry 4167 (class 2606 OID 16413)
-- Name: match_history match_history_pkey; Type: CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.match_history
    ADD CONSTRAINT match_history_pkey PRIMARY KEY (match_id);


--
-- TOC entry 4179 (class 2606 OID 24630)
-- Name: skins skins_pkey; Type: CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.skins
    ADD CONSTRAINT skins_pkey PRIMARY KEY (skin_id);


--
-- TOC entry 4169 (class 2606 OID 16420)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4164 (class 1259 OID 16431)
-- Name: fki_loser; Type: INDEX; Schema: public; Owner: transcendence_user
--

CREATE INDEX fki_loser ON public.match_history USING btree (user_id_loser);


--
-- TOC entry 4165 (class 1259 OID 16437)
-- Name: fki_winner; Type: INDEX; Schema: public; Owner: transcendence_user
--

CREATE INDEX fki_winner ON public.match_history USING btree (user_id_win);


--
-- TOC entry 4183 (class 2606 OID 24631)
-- Name: chat channel; Type: FK CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.chat
    ADD CONSTRAINT channel FOREIGN KEY (channel) REFERENCES public.chat(chat_id) NOT VALID;


--
-- TOC entry 4182 (class 2606 OID 16449)
-- Name: channels channel_owner; Type: FK CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channel_owner FOREIGN KEY (channel_owner) REFERENCES public.users(user_id);


--
-- TOC entry 4180 (class 2606 OID 16426)
-- Name: match_history loser; Type: FK CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.match_history
    ADD CONSTRAINT loser FOREIGN KEY (user_id_loser) REFERENCES public.users(user_id) NOT VALID;


--
-- TOC entry 4184 (class 2606 OID 24599)
-- Name: chat receiver; Type: FK CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.chat
    ADD CONSTRAINT receiver FOREIGN KEY (receiver) REFERENCES public.users(user_id);


--
-- TOC entry 4185 (class 2606 OID 24594)
-- Name: chat sender; Type: FK CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.chat
    ADD CONSTRAINT sender FOREIGN KEY (sender) REFERENCES public.users(user_id);


--
-- TOC entry 4181 (class 2606 OID 16432)
-- Name: match_history winner; Type: FK CONSTRAINT; Schema: public; Owner: transcendence_user
--

ALTER TABLE ONLY public.match_history
    ADD CONSTRAINT winner FOREIGN KEY (user_id_win) REFERENCES public.users(user_id) NOT VALID;


--
-- TOC entry 4345 (class 0 OID 0)
-- Dependencies: 4344
-- Name: DATABASE transcendence; Type: ACL; Schema: -; Owner: transcendence_user
--

REVOKE ALL ON DATABASE transcendence FROM transcendence_user;
GRANT CREATE,CONNECT ON DATABASE transcendence TO transcendence_user;
GRANT TEMPORARY ON DATABASE transcendence TO transcendence_user WITH GRANT OPTION;


--
-- TOC entry 4346 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: transcendence_user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2023-04-25 13:04:36 WEST

--
-- PostgreSQL database dump complete
--

