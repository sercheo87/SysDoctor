set @old_unique_checks=@@unique_checks, unique_checks=0;
set @old_foreign_key_checks=@@foreign_key_checks, foreign_key_checks=0;
set @old_sql_mode=@@sql_mode, sql_mode='traditional,allow_invalid_dates';

drop schema if exists `dbsysdoctor` ;
create schema if not exists `dbsysdoctor` default character set utf8 collate utf8_general_ci ;
show warnings;
use `dbsysdoctor` ;

-- -----------------------------------------------------
-- table `tbusers`
-- -----------------------------------------------------
drop table if exists `tbusers` ;

show warnings;
create table if not exists `tbusers` (
  `iduser` int not null auto_increment,
  `name` varchar(50) not null,
  `lastname` varchar(50) not null,
  `datebirth` date null,
  `state` bit null,
  `login` varchar(10) not null,
  `pass` varchar(50) not null,
  primary key (`iduser`))
engine = innodb
comment = 'lista de usuarios';

show warnings;

-- -----------------------------------------------------
-- table `tbcivilstatus`
-- -----------------------------------------------------
drop table if exists `tbcivilstatus` ;

show warnings;
create table if not exists `tbcivilstatus` (
  `id_status` tinyint not null auto_increment,
  `description` varchar(45) null,
  primary key (`id_status`))
engine = innodb
comment = 'lista de estado civil';

show warnings;
create unique index `idstatus_unique` on `tbcivilstatus` (`id_status` asc);

show warnings;

-- -----------------------------------------------------
-- table `tbnationality`
-- -----------------------------------------------------
drop table if exists `tbnationality` ;

show warnings;
create table if not exists `tbnationality` (
  `id_nationality` int not null auto_increment,
  `description` varchar(100) null,
  primary key (`id_nationality`))
engine = innodb
comment = 'lista de paises';

show warnings;

-- -----------------------------------------------------
-- table `tbprovince`
-- -----------------------------------------------------
drop table if exists `tbprovince` ;

show warnings;
create table if not exists `tbprovince` (
  `id_province` int not null auto_increment,
  `description` varchar(80) null,
  `id_nacionality` int not null,
  primary key (`id_province`, `id_nacionality`))
engine = innodb;

show warnings;

-- -----------------------------------------------------
-- table `tbcity`
-- -----------------------------------------------------
drop table if exists `tbcity` ;

show warnings;
create table if not exists `tbcity` (
  `id_city` int not null auto_increment,
  `city_name` varchar(100) null,
  `id_province` int null,
  primary key (`id_city`))
engine = innodb
comment = 'lista de ciudades disponibles';

show warnings;
create unique index `city_name_unique` on `tbcity` (`city_name` asc);

show warnings;

-- -----------------------------------------------------
-- table `tbeducation`
-- -----------------------------------------------------
drop table if exists `tbeducation` ;

show warnings;
create table if not exists `tbeducation` (
  `id_education` tinyint not null auto_increment,
  `description` varchar(100) not null,
  primary key (`id_education`))
engine = innodb
comment = 'lista de niveles de educacion';

show warnings;

-- -----------------------------------------------------
-- table `tbprofession`
-- -----------------------------------------------------
drop table if exists `tbprofession` ;

show warnings;
create table if not exists `tbprofession` (
  `id_profession` int not null auto_increment,
  `description` varchar(100) null,
  primary key (`id_profession`))
engine = innodb
comment = 'lista de profesiones';

show warnings;

-- -----------------------------------------------------
-- table `tbpatient`
-- -----------------------------------------------------
drop table if exists `tbpatient` ;

show warnings;
create table if not exists `tbpatient` (
  `id_patient` int not null auto_increment,
  `name` varchar(50) null,
  `last_name` varchar(100) null,
  `identification` varchar(20) null,
  `address` varchar(255) null default 'n/a',
  `phone` varchar(50) null,
  `id_civil_status` tinyint not null default 1,
  `email` varchar(100) null default 'n/a',
  `id_city` int not null default 6,
  `ocupation` varchar(255) null default 'n/a',
  `id_education` tinyint not null default 1,
  `id_profession` int not null default 1,
  primary key (`id_patient`, `id_city`, `id_civil_status`, `id_education`, `id_profession`))
engine = innodb
comment = 'detalle de pacientes';

show warnings;
create unique index `idpatient_unique` on `tbpatient` (`id_patient` asc);

show warnings;
create fulltext index `idx_name` on `tbpatient` (`name` asc, `last_name` asc);

show warnings;

-- -----------------------------------------------------
-- table `tbmedicalrecord`
-- -----------------------------------------------------
drop table if exists `tbmedicalrecord` ;

show warnings;
create table if not exists `tbmedicalrecord` (
  `id_medical` int not null auto_increment,
  `habit` varchar(500) null,
  `antecedent` varchar(500) null,
  `alergy` varchar(500) null,
  `date_reg` datetime not null,
  `observation` varchar(500) null default 'n/a',
  `id_patient` int not null,
  `blood type` varchar(10) null default 'n/a',
  primary key (`id_medical`, `id_patient`))
engine = innodb
comment = 'tabla maestra de las ficha en general';

show warnings;
create unique index `id_patient_unique` on `tbmedicalrecord` (`id_patient` asc);

show warnings;

-- -----------------------------------------------------
-- table `tbmedicalappointments`
-- -----------------------------------------------------
drop table if exists `tbmedicalappointments` ;

show warnings;
create table if not exists `tbmedicalappointments` (
  `id_appointments` int not null auto_increment,
  `id_medical` int not null,
  `date_consultation` datetime not null,
  `weight` decimal null,
  `size` decimal null,
  `pulse` int null,
  `blood_pressure` varchar(45) null,
  `motive` varchar(500) null,
  `diagnostic` varchar(500) null,
  primary key (`id_appointments`, `id_medical`, `date_consultation`))
engine = innodb
comment = 'historial de citas medicas ';

show warnings;

-- -----------------------------------------------------
-- table `tbgroupmedicine`
-- -----------------------------------------------------
drop table if exists `tbgroupmedicine` ;

show warnings;
create table if not exists `tbgroupmedicine` (
  `id_group_medicine` int not null auto_increment,
  `description` varchar(100) null,
  primary key (`id_group_medicine`))
engine = innodb
comment = 'clasificacion de la medicina';

show warnings;

-- -----------------------------------------------------
-- table `tbmedicine`
-- -----------------------------------------------------
drop table if exists `tbmedicine` ;

show warnings;
create table if not exists `tbmedicine` (
  `id_medicine` int not null auto_increment,
  `description` varchar(255) null,
  `id_group_medicine` int null,
  primary key (`id_medicine`))
engine = innodb
comment = 'medicina';

show warnings;

-- -----------------------------------------------------
-- table `tbrecipes`
-- -----------------------------------------------------
drop table if exists `tbrecipes` ;

show warnings;
create table if not exists `tbrecipes` (
  `id_recipe` int not null auto_increment,
  `id_appointments` int not null,
  `dose` int null,
  `recipe_time` int null,
  `duration` int null,
  `time_duration` int null,
  `id_medicine` int null,
  `observation` varchar(300) null,
  primary key (`id_recipe`, `id_appointments`))
engine = innodb
comment = 'detalle de receta';

show warnings;
use `dbsysdoctor` ;

-- -----------------------------------------------------
-- view `v_recieps`
-- -----------------------------------------------------
drop view if exists `v_recieps` ;
show warnings;
drop table if exists `v_recieps`;
show warnings;
use `dbsysdoctor`;
create  or replace view `v_recieps` as
    select 
        rep.id_recipe codigo,
    rep.id_appointments codigo_cita,
    rep.dose dosis,
    rep.recipe_time frecuencia,
    rep.duration duracion,
    rep.time_duration duracion_total,
    rep.observation observaciones,
    gmedicine.description tipo_medicina,
    med.description medicina
    from
        tbrecipes rep,
        tbmedicine med,
        tbgroupmedicine gmedicine
    where
        rep.id_medicine = med.id_medicine
            and gmedicine.id_group_medicine = med.id_group_medicine;
show warnings;

-- -----------------------------------------------------
-- data for table `tbcivilstatus`
-- -----------------------------------------------------
start transaction;
use `dbsysdoctor`;
insert into `tbcivilstatus` (`id_status`, `description`) values (1, 'soltero(a)');
insert into `tbcivilstatus` (`id_status`, `description`) values (2, 'casado(a)');
insert into `tbcivilstatus` (`id_status`, `description`) values (3, 'union libre');
insert into `tbcivilstatus` (`id_status`, `description`) values (4, 'divorciado');
insert into `tbcivilstatus` (`id_status`, `description`) values (5, 'viudo');

commit;


-- -----------------------------------------------------
-- data for table `tbnationality`
-- -----------------------------------------------------
start transaction;
use `dbsysdoctor`;
insert into `tbnationality` (`id_nationality`, `description`) values (1, 'afganistán');
insert into `tbnationality` (`id_nationality`, `description`) values (2, 'akrotiri');
insert into `tbnationality` (`id_nationality`, `description`) values (3, 'albania');
insert into `tbnationality` (`id_nationality`, `description`) values (4, 'alemania');
insert into `tbnationality` (`id_nationality`, `description`) values (5, 'andorra');
insert into `tbnationality` (`id_nationality`, `description`) values (6, 'angola');
insert into `tbnationality` (`id_nationality`, `description`) values (7, 'anguila');
insert into `tbnationality` (`id_nationality`, `description`) values (8, 'antártida');
insert into `tbnationality` (`id_nationality`, `description`) values (9, 'antigua y barbuda');
insert into `tbnationality` (`id_nationality`, `description`) values (10, 'antillas neerlandesas');
insert into `tbnationality` (`id_nationality`, `description`) values (11, 'arabia saudí');
insert into `tbnationality` (`id_nationality`, `description`) values (12, 'arctic ocean');
insert into `tbnationality` (`id_nationality`, `description`) values (13, 'argelia');
insert into `tbnationality` (`id_nationality`, `description`) values (14, 'argentina');
insert into `tbnationality` (`id_nationality`, `description`) values (15, 'armenia');
insert into `tbnationality` (`id_nationality`, `description`) values (16, 'aruba');
insert into `tbnationality` (`id_nationality`, `description`) values (17, 'ashmore and cartier islands');
insert into `tbnationality` (`id_nationality`, `description`) values (18, 'atlantic ocean');
insert into `tbnationality` (`id_nationality`, `description`) values (19, 'australia');
insert into `tbnationality` (`id_nationality`, `description`) values (20, 'austria');
insert into `tbnationality` (`id_nationality`, `description`) values (21, 'azerbaiyán');
insert into `tbnationality` (`id_nationality`, `description`) values (22, 'bahamas');
insert into `tbnationality` (`id_nationality`, `description`) values (23, 'bahráin');
insert into `tbnationality` (`id_nationality`, `description`) values (24, 'bangladesh');
insert into `tbnationality` (`id_nationality`, `description`) values (25, 'barbados');
insert into `tbnationality` (`id_nationality`, `description`) values (26, 'bélgica');
insert into `tbnationality` (`id_nationality`, `description`) values (27, 'belice');
insert into `tbnationality` (`id_nationality`, `description`) values (28, 'benín');
insert into `tbnationality` (`id_nationality`, `description`) values (29, 'bermudas');
insert into `tbnationality` (`id_nationality`, `description`) values (30, 'bielorrusia');
insert into `tbnationality` (`id_nationality`, `description`) values (31, 'birmania; myanmar');
insert into `tbnationality` (`id_nationality`, `description`) values (32, 'bolivia');
insert into `tbnationality` (`id_nationality`, `description`) values (33, 'bosnia y hercegovina');
insert into `tbnationality` (`id_nationality`, `description`) values (34, 'botsuana');
insert into `tbnationality` (`id_nationality`, `description`) values (35, 'brasil');
insert into `tbnationality` (`id_nationality`, `description`) values (36, 'brunéi');
insert into `tbnationality` (`id_nationality`, `description`) values (37, 'bulgaria');
insert into `tbnationality` (`id_nationality`, `description`) values (38, 'burkina faso');
insert into `tbnationality` (`id_nationality`, `description`) values (39, 'burundi');
insert into `tbnationality` (`id_nationality`, `description`) values (40, 'bután');
insert into `tbnationality` (`id_nationality`, `description`) values (41, 'cabo verde');
insert into `tbnationality` (`id_nationality`, `description`) values (42, 'camboya');
insert into `tbnationality` (`id_nationality`, `description`) values (43, 'camerún');
insert into `tbnationality` (`id_nationality`, `description`) values (44, 'canadá');
insert into `tbnationality` (`id_nationality`, `description`) values (45, 'chad');
insert into `tbnationality` (`id_nationality`, `description`) values (46, 'chile');
insert into `tbnationality` (`id_nationality`, `description`) values (47, 'china');
insert into `tbnationality` (`id_nationality`, `description`) values (48, 'chipre');
insert into `tbnationality` (`id_nationality`, `description`) values (49, 'clipperton island');
insert into `tbnationality` (`id_nationality`, `description`) values (50, 'colombia');
insert into `tbnationality` (`id_nationality`, `description`) values (51, 'comoras');
insert into `tbnationality` (`id_nationality`, `description`) values (52, 'congo');
insert into `tbnationality` (`id_nationality`, `description`) values (53, 'coral sea islands');
insert into `tbnationality` (`id_nationality`, `description`) values (54, 'corea del norte');
insert into `tbnationality` (`id_nationality`, `description`) values (55, 'corea del sur');
insert into `tbnationality` (`id_nationality`, `description`) values (56, 'costa de marfil');
insert into `tbnationality` (`id_nationality`, `description`) values (57, 'costa rica');
insert into `tbnationality` (`id_nationality`, `description`) values (58, 'croacia');
insert into `tbnationality` (`id_nationality`, `description`) values (59, 'cuba');
insert into `tbnationality` (`id_nationality`, `description`) values (60, 'dhekelia');
insert into `tbnationality` (`id_nationality`, `description`) values (61, 'dinamarca');
insert into `tbnationality` (`id_nationality`, `description`) values (62, 'dominica');
insert into `tbnationality` (`id_nationality`, `description`) values (63, 'ecuador');
insert into `tbnationality` (`id_nationality`, `description`) values (64, 'egipto');
insert into `tbnationality` (`id_nationality`, `description`) values (65, 'el salvador');
insert into `tbnationality` (`id_nationality`, `description`) values (66, 'el vaticano');
insert into `tbnationality` (`id_nationality`, `description`) values (67, 'emiratos árabes unidos');
insert into `tbnationality` (`id_nationality`, `description`) values (68, 'eritrea');
insert into `tbnationality` (`id_nationality`, `description`) values (69, 'eslovaquia');
insert into `tbnationality` (`id_nationality`, `description`) values (70, 'eslovenia');
insert into `tbnationality` (`id_nationality`, `description`) values (71, 'españa');
insert into `tbnationality` (`id_nationality`, `description`) values (72, 'estados unidos');
insert into `tbnationality` (`id_nationality`, `description`) values (73, 'estonia');
insert into `tbnationality` (`id_nationality`, `description`) values (74, 'etiopía');
insert into `tbnationality` (`id_nationality`, `description`) values (75, 'filipinas');
insert into `tbnationality` (`id_nationality`, `description`) values (76, 'finlandia');
insert into `tbnationality` (`id_nationality`, `description`) values (77, 'fiyi');
insert into `tbnationality` (`id_nationality`, `description`) values (78, 'francia');
insert into `tbnationality` (`id_nationality`, `description`) values (79, 'gabón');
insert into `tbnationality` (`id_nationality`, `description`) values (80, 'gambia');
insert into `tbnationality` (`id_nationality`, `description`) values (81, 'gaza strip');
insert into `tbnationality` (`id_nationality`, `description`) values (82, 'georgia');
insert into `tbnationality` (`id_nationality`, `description`) values (83, 'ghana');
insert into `tbnationality` (`id_nationality`, `description`) values (84, 'gibraltar');
insert into `tbnationality` (`id_nationality`, `description`) values (85, 'granada');
insert into `tbnationality` (`id_nationality`, `description`) values (86, 'grecia');
insert into `tbnationality` (`id_nationality`, `description`) values (87, 'groenlandia');
insert into `tbnationality` (`id_nationality`, `description`) values (88, 'guam');
insert into `tbnationality` (`id_nationality`, `description`) values (89, 'guatemala');
insert into `tbnationality` (`id_nationality`, `description`) values (90, 'guernsey');
insert into `tbnationality` (`id_nationality`, `description`) values (91, 'guinea');
insert into `tbnationality` (`id_nationality`, `description`) values (92, 'guinea ecuatorial');
insert into `tbnationality` (`id_nationality`, `description`) values (93, 'guinea-bissau');
insert into `tbnationality` (`id_nationality`, `description`) values (94, 'guyana');
insert into `tbnationality` (`id_nationality`, `description`) values (95, 'haití');
insert into `tbnationality` (`id_nationality`, `description`) values (96, 'honduras');
insert into `tbnationality` (`id_nationality`, `description`) values (97, 'hong kong');
insert into `tbnationality` (`id_nationality`, `description`) values (98, 'hungría');
insert into `tbnationality` (`id_nationality`, `description`) values (99, 'india');
insert into `tbnationality` (`id_nationality`, `description`) values (100, 'indian ocean');
insert into `tbnationality` (`id_nationality`, `description`) values (101, 'indonesia');
insert into `tbnationality` (`id_nationality`, `description`) values (102, 'irán');
insert into `tbnationality` (`id_nationality`, `description`) values (103, 'iraq');
insert into `tbnationality` (`id_nationality`, `description`) values (104, 'irlanda');
insert into `tbnationality` (`id_nationality`, `description`) values (105, 'isla bouvet');
insert into `tbnationality` (`id_nationality`, `description`) values (106, 'isla christmas');
insert into `tbnationality` (`id_nationality`, `description`) values (107, 'isla norfolk');
insert into `tbnationality` (`id_nationality`, `description`) values (108, 'islandia');
insert into `tbnationality` (`id_nationality`, `description`) values (109, 'islas caimán');
insert into `tbnationality` (`id_nationality`, `description`) values (110, 'islas cocos');
insert into `tbnationality` (`id_nationality`, `description`) values (111, 'islas cook');
insert into `tbnationality` (`id_nationality`, `description`) values (112, 'islas feroe');
insert into `tbnationality` (`id_nationality`, `description`) values (113, 'islas georgia del sur y sandwich del sur');
insert into `tbnationality` (`id_nationality`, `description`) values (114, 'islas heard y mcdonald');
insert into `tbnationality` (`id_nationality`, `description`) values (115, 'islas malvinas');
insert into `tbnationality` (`id_nationality`, `description`) values (116, 'islas marianas del norte');
insert into `tbnationality` (`id_nationality`, `description`) values (117, 'islas marshall');
insert into `tbnationality` (`id_nationality`, `description`) values (118, 'islas pitcairn');
insert into `tbnationality` (`id_nationality`, `description`) values (119, 'islas salomón');
insert into `tbnationality` (`id_nationality`, `description`) values (120, 'islas turcas y caicos');
insert into `tbnationality` (`id_nationality`, `description`) values (121, 'islas vírgenes americanas');
insert into `tbnationality` (`id_nationality`, `description`) values (122, 'islas vírgenes británicas');
insert into `tbnationality` (`id_nationality`, `description`) values (123, 'israel');
insert into `tbnationality` (`id_nationality`, `description`) values (124, 'italia');
insert into `tbnationality` (`id_nationality`, `description`) values (125, 'jamaica');
insert into `tbnationality` (`id_nationality`, `description`) values (126, 'jan mayen');
insert into `tbnationality` (`id_nationality`, `description`) values (127, 'japón');
insert into `tbnationality` (`id_nationality`, `description`) values (128, 'jersey');
insert into `tbnationality` (`id_nationality`, `description`) values (129, 'jordania');
insert into `tbnationality` (`id_nationality`, `description`) values (130, 'kazajistán');
insert into `tbnationality` (`id_nationality`, `description`) values (131, 'kenia');
insert into `tbnationality` (`id_nationality`, `description`) values (132, 'kirguizistán');
insert into `tbnationality` (`id_nationality`, `description`) values (133, 'kiribati');
insert into `tbnationality` (`id_nationality`, `description`) values (134, 'kuwait');
insert into `tbnationality` (`id_nationality`, `description`) values (135, 'laos');
insert into `tbnationality` (`id_nationality`, `description`) values (136, 'lesoto');
insert into `tbnationality` (`id_nationality`, `description`) values (137, 'letonia');
insert into `tbnationality` (`id_nationality`, `description`) values (138, 'líbano');
insert into `tbnationality` (`id_nationality`, `description`) values (139, 'liberia');
insert into `tbnationality` (`id_nationality`, `description`) values (140, 'libia');
insert into `tbnationality` (`id_nationality`, `description`) values (141, 'liechtenstein');
insert into `tbnationality` (`id_nationality`, `description`) values (142, 'lituania');
insert into `tbnationality` (`id_nationality`, `description`) values (143, 'luxemburgo');
insert into `tbnationality` (`id_nationality`, `description`) values (144, 'macao');
insert into `tbnationality` (`id_nationality`, `description`) values (145, 'macedonia');
insert into `tbnationality` (`id_nationality`, `description`) values (146, 'madagascar');
insert into `tbnationality` (`id_nationality`, `description`) values (147, 'malasia');
insert into `tbnationality` (`id_nationality`, `description`) values (148, 'malaui');
insert into `tbnationality` (`id_nationality`, `description`) values (149, 'maldivas');
insert into `tbnationality` (`id_nationality`, `description`) values (150, 'malí');
insert into `tbnationality` (`id_nationality`, `description`) values (151, 'malta');
insert into `tbnationality` (`id_nationality`, `description`) values (152, 'man isle of');
insert into `tbnationality` (`id_nationality`, `description`) values (153, 'marruecos');
insert into `tbnationality` (`id_nationality`, `description`) values (154, 'mauricio');
insert into `tbnationality` (`id_nationality`, `description`) values (155, 'mauritania');
insert into `tbnationality` (`id_nationality`, `description`) values (156, 'mayotte');
insert into `tbnationality` (`id_nationality`, `description`) values (157, 'méxico');
insert into `tbnationality` (`id_nationality`, `description`) values (158, 'micronesia');
insert into `tbnationality` (`id_nationality`, `description`) values (159, 'moldavia');
insert into `tbnationality` (`id_nationality`, `description`) values (160, 'mónaco');
insert into `tbnationality` (`id_nationality`, `description`) values (161, 'mongolia');
insert into `tbnationality` (`id_nationality`, `description`) values (162, 'montenegro');
insert into `tbnationality` (`id_nationality`, `description`) values (163, 'montserrat');
insert into `tbnationality` (`id_nationality`, `description`) values (164, 'mozambique');
insert into `tbnationality` (`id_nationality`, `description`) values (165, 'mundo');
insert into `tbnationality` (`id_nationality`, `description`) values (166, 'namibia');
insert into `tbnationality` (`id_nationality`, `description`) values (167, 'nauru');
insert into `tbnationality` (`id_nationality`, `description`) values (168, 'navassa island');
insert into `tbnationality` (`id_nationality`, `description`) values (169, 'nepal');
insert into `tbnationality` (`id_nationality`, `description`) values (170, 'nicaragua');
insert into `tbnationality` (`id_nationality`, `description`) values (171, 'níger');
insert into `tbnationality` (`id_nationality`, `description`) values (172, 'nigeria');
insert into `tbnationality` (`id_nationality`, `description`) values (173, 'niue');
insert into `tbnationality` (`id_nationality`, `description`) values (174, 'noruega');
insert into `tbnationality` (`id_nationality`, `description`) values (175, 'nueva caledonia');
insert into `tbnationality` (`id_nationality`, `description`) values (176, 'nueva zelanda');
insert into `tbnationality` (`id_nationality`, `description`) values (177, 'omán');
insert into `tbnationality` (`id_nationality`, `description`) values (178, 'pacific ocean');
insert into `tbnationality` (`id_nationality`, `description`) values (179, 'países bajos');
insert into `tbnationality` (`id_nationality`, `description`) values (180, 'pakistán');
insert into `tbnationality` (`id_nationality`, `description`) values (181, 'palaos');
insert into `tbnationality` (`id_nationality`, `description`) values (182, 'panamá');
insert into `tbnationality` (`id_nationality`, `description`) values (183, 'papúa-nueva guinea');
insert into `tbnationality` (`id_nationality`, `description`) values (184, 'paracel islands');
insert into `tbnationality` (`id_nationality`, `description`) values (185, 'paraguay');
insert into `tbnationality` (`id_nationality`, `description`) values (186, 'perú');
insert into `tbnationality` (`id_nationality`, `description`) values (187, 'polinesia francesa');
insert into `tbnationality` (`id_nationality`, `description`) values (188, 'polonia');
insert into `tbnationality` (`id_nationality`, `description`) values (189, 'portugal');
insert into `tbnationality` (`id_nationality`, `description`) values (190, 'puerto rico');
insert into `tbnationality` (`id_nationality`, `description`) values (191, 'qatar');
insert into `tbnationality` (`id_nationality`, `description`) values (192, 'reino unido');
insert into `tbnationality` (`id_nationality`, `description`) values (193, 'república centroafricana');
insert into `tbnationality` (`id_nationality`, `description`) values (194, 'república checa');
insert into `tbnationality` (`id_nationality`, `description`) values (195, 'república democrática del congo');
insert into `tbnationality` (`id_nationality`, `description`) values (196, 'república dominicana');
insert into `tbnationality` (`id_nationality`, `description`) values (197, 'ruanda');
insert into `tbnationality` (`id_nationality`, `description`) values (198, 'rumania');
insert into `tbnationality` (`id_nationality`, `description`) values (199, 'rusia');
insert into `tbnationality` (`id_nationality`, `description`) values (200, 'sáhara occidental');
insert into `tbnationality` (`id_nationality`, `description`) values (201, 'samoa');
insert into `tbnationality` (`id_nationality`, `description`) values (202, 'samoa americana');
insert into `tbnationality` (`id_nationality`, `description`) values (203, 'san cristóbal y nieves');
insert into `tbnationality` (`id_nationality`, `description`) values (204, 'san marino');
insert into `tbnationality` (`id_nationality`, `description`) values (205, 'san pedro y miquelón');
insert into `tbnationality` (`id_nationality`, `description`) values (206, 'san vicente y las granadinas');
insert into `tbnationality` (`id_nationality`, `description`) values (207, 'santa helena');
insert into `tbnationality` (`id_nationality`, `description`) values (208, 'santa lucía');
insert into `tbnationality` (`id_nationality`, `description`) values (209, 'santo tomé y príncipe');
insert into `tbnationality` (`id_nationality`, `description`) values (210, 'senegal');
insert into `tbnationality` (`id_nationality`, `description`) values (211, 'serbia');
insert into `tbnationality` (`id_nationality`, `description`) values (212, 'seychelles');
insert into `tbnationality` (`id_nationality`, `description`) values (213, 'sierra leona');
insert into `tbnationality` (`id_nationality`, `description`) values (214, 'singapur');
insert into `tbnationality` (`id_nationality`, `description`) values (215, 'siria');
insert into `tbnationality` (`id_nationality`, `description`) values (216, 'somalia');
insert into `tbnationality` (`id_nationality`, `description`) values (217, 'southern ocean');
insert into `tbnationality` (`id_nationality`, `description`) values (218, 'spratly islands');
insert into `tbnationality` (`id_nationality`, `description`) values (219, 'sri lanka');
insert into `tbnationality` (`id_nationality`, `description`) values (220, 'suazilandia');
insert into `tbnationality` (`id_nationality`, `description`) values (221, 'sudáfrica');
insert into `tbnationality` (`id_nationality`, `description`) values (222, 'sudán');
insert into `tbnationality` (`id_nationality`, `description`) values (223, 'suecia');
insert into `tbnationality` (`id_nationality`, `description`) values (224, 'suiza');
insert into `tbnationality` (`id_nationality`, `description`) values (225, 'surinam');
insert into `tbnationality` (`id_nationality`, `description`) values (226, 'svalbard y jan mayen');
insert into `tbnationality` (`id_nationality`, `description`) values (227, 'tailandia');
insert into `tbnationality` (`id_nationality`, `description`) values (228, 'taiwán');
insert into `tbnationality` (`id_nationality`, `description`) values (229, 'tanzania');
insert into `tbnationality` (`id_nationality`, `description`) values (230, 'tayikistán');
insert into `tbnationality` (`id_nationality`, `description`) values (231, 'territorio británico del océano indico');
insert into `tbnationality` (`id_nationality`, `description`) values (232, 'territorios australes franceses');
insert into `tbnationality` (`id_nationality`, `description`) values (233, 'timor oriental');
insert into `tbnationality` (`id_nationality`, `description`) values (234, 'togo');
insert into `tbnationality` (`id_nationality`, `description`) values (235, 'tokelau');
insert into `tbnationality` (`id_nationality`, `description`) values (236, 'tonga');
insert into `tbnationality` (`id_nationality`, `description`) values (237, 'trinidad y tobago');
insert into `tbnationality` (`id_nationality`, `description`) values (238, 'túnez');
insert into `tbnationality` (`id_nationality`, `description`) values (239, 'turkmenistán');
insert into `tbnationality` (`id_nationality`, `description`) values (240, 'turquía');
insert into `tbnationality` (`id_nationality`, `description`) values (241, 'tuvalu');
insert into `tbnationality` (`id_nationality`, `description`) values (242, 'ucrania');
insert into `tbnationality` (`id_nationality`, `description`) values (243, 'uganda');
insert into `tbnationality` (`id_nationality`, `description`) values (244, 'unión europea');
insert into `tbnationality` (`id_nationality`, `description`) values (245, 'uruguay');
insert into `tbnationality` (`id_nationality`, `description`) values (246, 'uzbekistán');
insert into `tbnationality` (`id_nationality`, `description`) values (247, 'vanuatu');
insert into `tbnationality` (`id_nationality`, `description`) values (248, 'venezuela');
insert into `tbnationality` (`id_nationality`, `description`) values (249, 'vietnam');
insert into `tbnationality` (`id_nationality`, `description`) values (250, 'wake island');
insert into `tbnationality` (`id_nationality`, `description`) values (251, 'wallis y futuna');
insert into `tbnationality` (`id_nationality`, `description`) values (252, 'west bank');
insert into `tbnationality` (`id_nationality`, `description`) values (253, 'yemen');
insert into `tbnationality` (`id_nationality`, `description`) values (254, 'yibuti');
insert into `tbnationality` (`id_nationality`, `description`) values (255, 'zambia');
insert into `tbnationality` (`id_nationality`, `description`) values (256, 'zimbabue');

commit;


-- -----------------------------------------------------
-- data for table `tbprovince`
-- -----------------------------------------------------
start transaction;
use `dbsysdoctor`;
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (1, 'azuay', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (2, 'bolivar', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (3, 'caã±ar', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (4, 'carchi', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (5, 'chimborazo', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (6, 'cotopaxi', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (7, 'el oro', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (8, 'esmeraldas', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (9, 'galapagos', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (10, 'guayas', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (11, 'imbabura', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (12, 'loja', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (13, 'los rios', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (14, 'manabi', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (15, 'morona santiago', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (16, 'napo', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (17, 'orellana', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (18, 'pastaza', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (19, 'pichincha', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (20, 'santa elena', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (21, 'santo domingo de los tsachilas', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (22, 'sucumbios', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (23, 'tungurahua', 63);
insert into `tbprovince` (`id_province`, `description`, `id_nacionality`) values (24, 'zamora chinchipe', 63);

commit;


-- -----------------------------------------------------
-- data for table `tbcity`
-- -----------------------------------------------------
start transaction;
use `dbsysdoctor`;
insert into `tbcity` (`id_city`, `city_name`, `id_province`) values (1, 'cayambe', 19);
insert into `tbcity` (`id_city`, `city_name`, `id_province`) values (2, 'mejã­a', 19);
insert into `tbcity` (`id_city`, `city_name`, `id_province`) values (3, 'pedro moncayo', 19);
insert into `tbcity` (`id_city`, `city_name`, `id_province`) values (4, 'pedro vicente maldonado', 19);
insert into `tbcity` (`id_city`, `city_name`, `id_province`) values (5, 'puerto quito', 19);
insert into `tbcity` (`id_city`, `city_name`, `id_province`) values (6, 'distrito metropolitano de quito', 19);
insert into `tbcity` (`id_city`, `city_name`, `id_province`) values (7, 'rumiã±ahui', 19);
insert into `tbcity` (`id_city`, `city_name`, `id_province`) values (8, 'san miguel de los bancos', 19);

commit;


-- -----------------------------------------------------
-- data for table `tbeducation`
-- -----------------------------------------------------
start transaction;
use `dbsysdoctor`;
insert into `tbeducation` (`id_education`, `description`) values (1, 'ninguno');
insert into `tbeducation` (`id_education`, `description`) values (2, 'primaria');
insert into `tbeducation` (`id_education`, `description`) values (3, 'securdaria');
insert into `tbeducation` (`id_education`, `description`) values (4, 'universitaria');
insert into `tbeducation` (`id_education`, `description`) values (5, 'phd');
insert into `tbeducation` (`id_education`, `description`) values (6, 'maestrias');

commit;


-- -----------------------------------------------------
-- data for table `tbprofession`
-- -----------------------------------------------------
start transaction;
use `dbsysdoctor`;
insert into `tbprofession` (`id_profession`, `description`) values (1, 'ninguno');
insert into `tbprofession` (`id_profession`, `description`) values (2, 'abogado/a');
insert into `tbprofession` (`id_profession`, `description`) values (3, 'actor /actriz');
insert into `tbprofession` (`id_profession`, `description`) values (4, 'agente de viaje');
insert into `tbprofession` (`id_profession`, `description`) values (5, 'ama de casa');
insert into `tbprofession` (`id_profession`, `description`) values (6, 'arquitecto/a');
insert into `tbprofession` (`id_profession`, `description`) values (7, 'astronomo/a');
insert into `tbprofession` (`id_profession`, `description`) values (8, 'autor/a');
insert into `tbprofession` (`id_profession`, `description`) values (9, 'barrendero/a');
insert into `tbprofession` (`id_profession`, `description`) values (10, 'bibliotecario/a');
insert into `tbprofession` (`id_profession`, `description`) values (11, 'bombero/a');
insert into `tbprofession` (`id_profession`, `description`) values (12, 'cartero/a');
insert into `tbprofession` (`id_profession`, `description`) values (13, 'carnicero/a');
insert into `tbprofession` (`id_profession`, `description`) values (14, 'carpintero/a');
insert into `tbprofession` (`id_profession`, `description`) values (15, 'cientifico/a');
insert into `tbprofession` (`id_profession`, `description`) values (16, 'cirujano/a');
insert into `tbprofession` (`id_profession`, `description`) values (17, 'contador/a');
insert into `tbprofession` (`id_profession`, `description`) values (18, 'dentista');
insert into `tbprofession` (`id_profession`, `description`) values (19, 'diseã±ador/a');
insert into `tbprofession` (`id_profession`, `description`) values (20, 'doctor/a');
insert into `tbprofession` (`id_profession`, `description`) values (21, 'electricista');
insert into `tbprofession` (`id_profession`, `description`) values (22, 'enfermero/a');
insert into `tbprofession` (`id_profession`, `description`) values (23, 'estilista');
insert into `tbprofession` (`id_profession`, `description`) values (24, 'farmaceutico/a');
insert into `tbprofession` (`id_profession`, `description`) values (25, 'fontanero/a');
insert into `tbprofession` (`id_profession`, `description`) values (26, 'florista');
insert into `tbprofession` (`id_profession`, `description`) values (27, 'fotografo/a');
insert into `tbprofession` (`id_profession`, `description`) values (28, 'gasfiter');
insert into `tbprofession` (`id_profession`, `description`) values (29, 'gasfitero');
insert into `tbprofession` (`id_profession`, `description`) values (30, 'granjero/campesino');
insert into `tbprofession` (`id_profession`, `description`) values (31, 'jardinero/a');
insert into `tbprofession` (`id_profession`, `description`) values (32, 'juez/a');
insert into `tbprofession` (`id_profession`, `description`) values (33, 'limpiador/a de vidrios');
insert into `tbprofession` (`id_profession`, `description`) values (34, 'maestro de construccion');
insert into `tbprofession` (`id_profession`, `description`) values (35, 'mecanico/a');
insert into `tbprofession` (`id_profession`, `description`) values (36, 'mesero/a');
insert into `tbprofession` (`id_profession`, `description`) values (37, 'modelo/a');
insert into `tbprofession` (`id_profession`, `description`) values (38, 'oftalmologo');
insert into `tbprofession` (`id_profession`, `description`) values (39, 'panadero/a');
insert into `tbprofession` (`id_profession`, `description`) values (40, 'periodista');
insert into `tbprofession` (`id_profession`, `description`) values (41, 'pescador/a');
insert into `tbprofession` (`id_profession`, `description`) values (42, 'pintor/a');
insert into `tbprofession` (`id_profession`, `description`) values (43, 'piloto');
insert into `tbprofession` (`id_profession`, `description`) values (44, 'plomero/a');
insert into `tbprofession` (`id_profession`, `description`) values (45, 'policia');
insert into `tbprofession` (`id_profession`, `description`) values (46, 'politico');
insert into `tbprofession` (`id_profession`, `description`) values (47, 'profesor/a');
insert into `tbprofession` (`id_profession`, `description`) values (48, 'psiquiatra');
insert into `tbprofession` (`id_profession`, `description`) values (49, 'recepcionista');
insert into `tbprofession` (`id_profession`, `description`) values (50, 'salvavidas');
insert into `tbprofession` (`id_profession`, `description`) values (51, 'sastre');
insert into `tbprofession` (`id_profession`, `description`) values (52, 'secretario/a');
insert into `tbprofession` (`id_profession`, `description`) values (53, 'soldado');
insert into `tbprofession` (`id_profession`, `description`) values (54, 'taxista');
insert into `tbprofession` (`id_profession`, `description`) values (55, 'trabajador/a de fabrica');
insert into `tbprofession` (`id_profession`, `description`) values (56, 'traductor/a');
insert into `tbprofession` (`id_profession`, `description`) values (57, 'vendedor/a');
insert into `tbprofession` (`id_profession`, `description`) values (58, 'veterinario/a');

commit;


set sql_mode=@old_sql_mode;
set foreign_key_checks=@old_foreign_key_checks;
set unique_checks=@old_unique_checks;
