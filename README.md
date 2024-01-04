# notus

![notus app preview](./notus-screenshot.png)

## This app is still WIP and not usable yet…

This is a simple notes app using markdown.

## Gettings started

On the first time, create a virtual environment:

```sh
python3 -m venv env
```

This creates a virtual environment in the `./env` directory which is also added to `.gitignore`.

Start the virtual environment:

```sh
source ./env/bin/activate
```

Verify that the virtual environment is active:

```sh
which python
```

On the first time, install dependencies:

```sh
python -m pip install fastapi "uvicorn[standard]"
```

Run the application:

```sh
uvicorn main:app
```

To watch for changes, run the command with the [`--reload`](https://sqlmodel.tiangolo.com/tutorial/fastapi/simple-hero-api/#uvicorn-reload) option.

The backend will run on port `8000`.

Open a new terminal and run the web app:

```sh
cd app
npm run dev
```

Check the docs at `http://localhost:8000/docs`.

Login to the MySQL monitor via:

```sh
mysql -u root -p
```

## ToDos

- [ ] Add API to add, edit and delete notes connected to a user.
- [ ] Connect endpoints with react app.
- [ ] Show tags in app.
- [ ] Add syntax highlighting to preview.
- [ ] Add search feature
- [ ] More do be added…
