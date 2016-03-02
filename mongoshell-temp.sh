#!/bin/bash
# Script to connect to the deployed mongo shell

mongo `meteor mongo --url opengl.meteor.com | sed 's/mongodb:\/\//-u /' | sed 's/:/ -p /' | sed 's/@/ /'`
