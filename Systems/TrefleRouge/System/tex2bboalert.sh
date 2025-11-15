#! /bin/sh
node tex2bboalert.js RCbase.tex > RC.txt
node tex2bboalert.js RC1T.tex >> RC.txt
node tex2bboalert.js RC1K.tex >> RC.txt
node tex2bboalert.js RC1C.tex >> RC.txt
node tex2bboalert.js RC1P.tex >> RC.txt
node tex2bboalert.js RC1SA.tex >> RC.txt
node tex2bboalert.js RC2m.tex >> RC.txt
node tex2bboalert.js RC2C.tex >> RC.txt


