import htmlPy
from back_end import BackEnd
from PyQt4 import QtCore
from PyQt4 import QtGui

app = htmlPy.AppGUI(
    title=u"AVV Timetable")
app.maximized = True
app.template_path = "."
app.bind(BackEnd(app))
app.template = ("index.html", {})
#app.window.setWindowFlags(QtCore.Qt.FramelessWindowHint) # For Fullscreen

if __name__ == "__main__":
    app.start()
