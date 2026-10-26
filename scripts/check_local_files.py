
# Import Python's built-in tools for reading and analysing HTML.
# HTMLParser reads HTML tags and their attributes without needing
# to open the website in a browser.
from html.parser import HTMLParser

# Path helps us build file and folder paths in a way that works
# across different operating systems.
from pathlib import Path

# urlsplit separates a URL into parts, such as its file path,
# query string and fragment.
# unquote converts URL-encoded characters, such as %20, into
# their original characters, such as spaces.
from urllib.parse import unquote, urlsplit


# Find the root folder of the GitHub repository.
# __file__ is the path to this Python script.
# resolve() converts it into an absolute path.
# parent is the folder containing this script ("scripts").
# parent.parent moves up one more level to the repository root.
# This allows the checker to find website files from one known
# starting point, even when the script is run from another folder.
ROOT = Path(__file__).resolve().parent.parent


# List HTML tags and the attributes that can point to local files.
# For example:
#   <a href="About Me.html"> points to another page.
#   <img src="joanna.jpg"> points to an image.
#   <link href="styles.css"> can point to a stylesheet.
#   <script src="script.js"> points to a JavaScript file.
#
# The checker examines only the attributes listed here.
# We can add more tags or attributes if the website needs them.
FILE_ATTRIBUTES = {
    "a": ["href"],
    "img": ["src"],
    "script": ["src"],
    "link": ["href"],
    "source": ["src"],
    "video": ["src", "poster"],
    "audio": ["src"],
}


# These URL schemes identify links that do not refer to ordinary
# local files in the repository.
#
# Examples:
#   https://example.com  -> a link to another website
#   mailto:hello@example.com -> an email link
#   tel:0123456789 -> a telephone link
#   data:... -> data embedded directly in the HTML
#
# The checker skips these because it cannot verify them by looking
# for a matching file in the repository.
NON_FILE_SCHEMES = {
    "http", "https", "mailto", "tel",
}   
