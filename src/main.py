#!/usr/bin/env python

import htmlPy
from back_end import BackEnd
from PyQt4 import QtCore
import os


# Initial confiurations
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = htmlPy.AppGUI(
    title=u"AVV Timetable")#,
    #maximized=True)
app.maximized = True
app.template_path = "."
app.static_path = os.path.join(BASE_DIR, ".")
app.bind(BackEnd(app))
app.template = ("index.html", {})
#app.window.setWindowFlags(QtCore.Qt.FramelessWindowHint) # For Fullscreen

if __name__ == "__main__":
    app.start()
