#!/bin/bash
#set -e 


for i in $( cat ./carList.txt ); do
	wget http://www.carlogos.org/logo/${i}-logo.jpg
done

