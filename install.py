#!/usr/bin/env python
import subprocess

subprocess.call(["sudo","apt-get","install","python-qt4"])
subprocess.call(["sudo","apt-get","install","python-pyside"])
subprocess.call(["sudo","apt-get","install","python-pip"])
subprocess.call(["pip","install","htmlPy"])

print "Install complete"
