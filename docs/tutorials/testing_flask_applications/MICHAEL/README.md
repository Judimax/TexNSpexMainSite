# My take
* for more reseaerch read on
* in basics the cornerstore of python is known as context, all of its unit tests are pure functions
* you we see fixutres as params passed to the text fns
* there are 4 fixtures you need
    * client, allows you to call the route used after you mocked everything in the route
    * monkeypatch, allows you to replace a class fn or method with a fake
    * requests_mock, allows you to hijack a request and allow it not to do anything
    * mocker - allows you to hijack a class or method in addition, do several asserts including how many times it was called what it was called with
        * use monkeypatch and mocker as needed
        * [mocker docs](https://docs.python.org/dev/library/unittest.mock.html)

# Resources
[Testing Flask Applications](https://flask.palletsprojects.com/en/2.2.x/testing/)


# Testing Flask Applications
* Tests are typically located in the tests folder. Tests are functions that start with test_, in Python modules that start with test_. Tests can also be further grouped in classes that start with Test.

# Fixture
```py
import pytest
from my_project import create_app

@pytest.fixture()
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

    # other setup can go here

    yield app

    # clean up / reset resources here


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
```

* there is a client you can use to make http requests
* client.get() and client.post()
[full docs](https://werkzeug.palletsprojects.com/en/2.2.x/test/#werkzeug.test.EnvironBuilder)



```py
* def test_request_example(client):
    response = client.get("/posts")
    assert b"<h2>Hello, World!</h2>" in response.data
```
Pass a dict query_string={"key": "value", ...} to set arguments in the query string (after the ? in the URL). Pass a dict headers={} to set request headers.

To send a request body in a POST or PUT request, pass a value to data. If raw bytes are passed, that exact body is used. Usually, you’ll pass a dict to set form data.

To send form data, pass a dict to data. The Content-Type header will be set to multipart/form-data or application/x-www-form-urlencoded automatically.

* deaing with files
  * file is automatically closed after the request
```py
from pathlib import Path

# get the resources folder in the tests folder
resources = Path(__file__).parent / "resources"

def test_edit_user(client):
    response = client.post("/user/2/edit", data={
        "name": "Flask",
        "theme": "dark",
        "picture": (resources / "picture.png").open("rb"),
    })
    assert response.status_code == 200
```

* handle json.data
```py
def test_json_data(client):
    response = client.post("/graphql", json={
        "query": """
            query User($id: String!) {
                user(id: $id) {
                    name
                    theme
                    picture_url
                }
            }
        """,
        variables={"id": 2},
    })
    assert response.json["data"]["user"]["name"] == "Flask"
```

* follow redirects
  * By passing follow_redirects=True
```py
def test_logout_redirect(client):
    response = client.get("/logout")
    # Check that there was one redirect response.
    assert len(response.history) == 1
    # Check that the second request was to the index page.
    assert response.request.path == "/index"
```

* to access session
```py
from flask import session

def test_access_session(client):
    with client:
        client.post("/auth/login", data={"username": "flask"})
        # session is still accessible
        assert session["user_id"] == 1

    # session is no longer accessible
```

* If you want to access or set a value in the session before making a reques t, use the client’s session_transaction()
```py
from flask import session

def test_modify_session(client):
    with client.session_transaction() as session:
        # set a user id without going through the login route
        session["user_id"] = 1

    # session is saved now

    response = client.get("/users/me")
    assert response.json["username"] == "flask"
```

* runnig commands with the cli runner
```py
import click

@app.cli.command("hello")
@click.option("--name", default="World")
def hello_command(name):
    click.echo(f"Hello, {name}!")

def test_hello_command(runner):
    result = runner.invoke(args="hello")
    assert "World" in result.output

    result = runner.invoke(args=["hello", "--name", "Flask"])
    assert "Flask" in result.output
```


* Use with app.app_context() to push an application context. For example, database extensions usually require an active app context to make queries.
```py
def test_db_post_model(app):
    with app.app_context():
        post = db.session.query(Post).get(1)
```

* to push a request context use  with app.test_request_context() to push a request context.
```py
def test_validate_user_edit(app):
    with app.test_request_context(
        "/user/2/edit", method="POST", data={"name": ""}
    ):
        # call a function that accesses `request`
        messages = validate_edit_user()

    assert messages["name"][0] == "Name cannot be empty."
```

* Creating a test request context doesn’t run any of the Flask dispatching code, so before_request functions are not called. If you need to call these, usually it’s better to make a full request instead

## [Tests Tutorial](https://flask.palletsprojects.com/en/2.2.x/tutorial/tests/)
### Database
__FILE - tests/test_db.py__
* Within an application context, get_db should return the same connection each time it’s called. After the context, the connection should be closed.
* The init-db command should call the init_db function and output a message.

* __monkeypatch is like spyOn().and.callFake
    *init_db is the method fake db is the method to be called
```py
    monkeypatch.setattr('db.init_db', fake_init_db)
```

### Authentication
* you dont want to repeat yourself so you can do this

FILE: __tests/conftest.py__
```py
class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username='test', password='test'):
        return self._client.post(
            '/auth/login',
            data={'username': username, 'password': password}
        )

    def logout(self):
        return self._client.get('/auth/logout')


@pytest.fixture
def auth(client):
    return AuthActions(client)

```

* data contains the body of the response as bytes. If you expect a certain value to render on the page, check that it’s in data. Bytes must be compared to bytes. If you want to compare text, use get_data(as_text=True)

* Using client in a with block allows accessing context variables such as session after the response is returned. Normally, accessing session outside of a request would raise an error.

* basically pytest knows what paramenters by its name so in conftest
```py
@pytest.fixture
def auth(client):
    return AuthActions(client)
```


* if you have auth as a paramenter in your test you will get the auth context

### Blog
* auth fixture/context  is used plenty becuase to edit any blog a person must be logged in as that user


