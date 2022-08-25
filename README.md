# Online images to Minecraft skins converter

## Tutorial

Prepare image of your choice. Square fragments yield the best results. You can cut them out e.g. in [GIMP](https://www.gimp.org/).

<img height=200 alt="pikachu" src="https://user-images.githubusercontent.com/45500957/136184605-0460a7f8-5284-42b9-aee3-23291f28a7e2.png"> <img height=200 alt="pikachu_sq" src="https://user-images.githubusercontent.com/45500957/136184642-c0aaed82-fd81-4b56-8b65-c880d906a975.png">

Load image from your disk into form.\
![filled_form](https://user-images.githubusercontent.com/45500957/186706056-e4a110dc-9e1f-4b11-b351-19d4187a01fc.png)

Select the fill color of skin's sides.\
![select_fill_color](https://user-images.githubusercontent.com/45500957/186705789-8ad5b970-b48f-48fa-a434-37d36f8888d4.png)

Hit "Create skin" button. Download will start automatically.\
In your Minecraft launcher navigate to Skins > New skin > Browse. Select your skin and submit.

![final_skin](https://user-images.githubusercontent.com/45500957/186708759-3d79ec28-9403-4dc2-b4db-2cfd08e8601a.png)

## Deployment instructions

### Prerequisites

Before running instance of the app, make sure to run `configure` script.
This will create Python virtual environment in `pyenv` directory, download necessary Python packages and create directories required for the app to work.

```
./configure
npm install
```

### Launch

```
npm start
```
