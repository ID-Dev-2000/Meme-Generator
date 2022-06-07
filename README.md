https://id-dev-2000.github.io/Meme-Generator/

- receives photos from the imgflip API
- displays photos as options for the user to select
- allows user to input text after selecting image
- displays text over image (as a canvas element)
- allows user to save image as new meme with selected image as background, input text displayed over top

Note:
- formatting of image text is flawed. Must handle text overflow via some form of wrapping.
- originally intended to handle the image text via a POST request to the API
- elected to write my own text handler because I was confused by the API's documentation
- also need to add enter-key functionality on input forms
- should figure out some form of download button, rather than "right click -> save"

API source: https://imgflip.com/api
