#! /bin/sh
echo BBOalert, Trefle Rouge > RC.bbo
node tex2bboalert.js RCbase.tex >> RC.bbo
node tex2bboalert.js RC1T.tex >> RC.bbo
node tex2bboalert.js RC1K.tex >> RC.bbo
node tex2bboalert.js RC1C.tex >> RC.bbo
node tex2bboalert.js RC1P.tex >> RC.bbo
node tex2bboalert.js RC1SA.tex >> RC.bbo
node tex2bboalert.js RC2m.tex >> RC.bbo
node tex2bboalert.js RC2C.tex >> RC.bbo


