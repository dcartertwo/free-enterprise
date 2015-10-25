DROP TABLE IF EXISTS test CASCADE;

CREATE TABLE test (
    tid     integer PRIMARY KEY,
    name    varchar(40)
);

INSERT INTO test VALUES (1, 'first guy');
INSERT INTO test VALUES (2, 'second guy');
INSERT INTO test VALUES (3, 'third guy');
INSERT INTO test VALUES (4, 'last guy');