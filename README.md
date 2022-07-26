This is an experimental interface for viewing variant text. Development was begun at the [Huygens Institute](http://huygens.knaw.nl/) in early 2016 in the context of a design sprint centred around the concept of "text-as-graph", particularly as used in the [Stemmaweb](https://stemmaweb.net/) tools.

This fork has updated the original proof of concept to use live data, and reworked it to be supported by the [Create React App](https://github.com/facebook/create-react-app) infrastructure.

## Setup

### Install Dependencies

Within the root directory, install dependencies required to run the application:  
```
npm install
```

### Environment Variables
1. Within the root directory, create a new file named `.env`. **It is highly recommended that this file be git-ignored in order to avoid committing sensitive data into version control.**

2. In the newly created `.env` file, add the following environment variables:
* **`PUBLIC_URL`**
  * Ex: `PUBLIC_URL=enter_url_here_with_no_spaces_or_quotes`
* **`REACT_APP_MAPBOX_TOKEN`**
  * Ex: `REACT_APP_MAPBOX_TOKEN=enter_token_here_with_no_spaces_or_quotes`
  * A Mapbox token can be obtained from the [Mapbox website](www.mapbox.com) - see the "Access tokens" section of your Mapbox account page.
* **`REACT_APP_HOMEPATH`**
  * Ex: `REACT_APP_HOMEPATH=/ChronicleME/`


### API Configuration
1. Within the `/script` directory, create a new file named `lemma-html-config.json`.  **It is highly recommended that this file be git-ignored in order to avoid committing sensitive data into version control** - this is why we provide an example file (`lemma-html-config.json.example`), rather than the file itself, on GitHub.

2. In the newly created `lemma-html-config.json` file, add a JSON object with the following keys (be sure to update with your own values):

```
{
    "options": {
        "repository": "repository URL goes inside these quotes",
        "tradition_id": "tradition ID goes inside these quotes"
    },
    "auth": {
        "username": "API auth username goes inside these quotes",
        "password": "API auth password goes inside these quotes"
    }
}
```

**Note** - an example file, `lemma-html-config.json.example`, has been provided as an example.


### Data Generation

Within the root directory, run the following command:

```
node script/generateAllData.js
```

## Local Development
Run the application locally:

```
yarn start
```

## Deploying
**Within the project root directory:**
```
yarn build   
zip -r <buildID> build
scp <buildID>.zip edition@monitor.stemmaweb.net:.
```

**On the server:**  
```sh
rm -rf build
unzip <buildID>
rm -rf www/*
cp -r build/* www
```

## DTS support
To support [DTS](https://distributed-text-services.github.io/specifications/) navigation and document endpoints using [DTSflat-server](https://github.com/robcast/dtsflat-server) and [Simple tei2dtsflat](https://github.com/robcast/simple-tei2dtsflat), follow the following instructions.

### Dependency Installation
Navigate to the `/script` directory and clone the simple-tei2dtsflat repo.

```sh
cd script
git clone https://github.com/performant-software/simple-tei2dtsflat.git
cd ..
```

### DTS Data Generation
From the project root directory, run the following command:

```sh
node script/generateDtsData.js
```

This will create a new timestamped directory in the `public/data` folder, containing a DTSFlat file structure of all manuscripts and the lemma edition.

### DTS Endpoint Nginx Configuration

In order to set up a server with DTS, you may follow the instructions at the [DTSflat-server](https://github.com/robcast/dtsflat-server) repo. Just copy your new DTS data directory (`public/data/dts-data_YYYY-MM-DD_hh:mm:ss`) to the `DTS_DATA_DIR` location you set in `.env` when following that repo.

If you wish to serve the DTS endpoints from the same server as the critical edition, you may need to modify the Nginx configuration. For example, our development server uses the following configuration to serve the DTS endpoints from `/dts`, pulling data from the `/var/www/dts-data` directory. It is appended as a second `location` block, in addition to block one for `/` that serves the critical edition static site from the `/var/www/html` directory.

To view this configuration, view [example.nginx.conf](script/example.nginx.conf) in the `/script` directory.

With this configuration, when you are ready to regenerate the DTS data, you can run the script and then replace the contents of `/var/www/dts-data` on the server with the contents of the latest `public/data/dts-data_YYYY-MM-DD_hh:mm:ss` directory. For example, from the project root directory on your local machine, the command might look something like this with [rsync](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories):

```sh
rsync -ar --delete public/data/dts-data_YYYY-MM-DD_hh:mm:ss/. user@server:/var/www/dts-data
```

We run it with the following additional options in order to ensure MacOS Spotlight `.DS_Store` files are not included:

```sh
rsync -arv --exclude=.DS_Store --delete-excluded --delete public/data/dts-data_YYYY-MM-DD_hh:mm:ss/. user@server:/var/www/dts-data
```
