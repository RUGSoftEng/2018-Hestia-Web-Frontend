<center>
	<!-- Title image and text. -->
	<h1>Hestia Web Development Architecture Document</h1>
	<span style="font-style: italic; color: #b34700">Version 1.0</span>
</center>

### Clients
- F. te Nijenhuis
- L. Holdijk

### Authors
* A. Lalis
* T.K. Harrison
* R.T. Nijman
* P. Oetinger
* N. Dijkema
* E. Abdo
* R. Bell
* S. Oegema

### Teaching Assistant
Feiko Ritsema

## Introduction
The Hestia System as created by the Clients, already implements the fundamental functionality of the home automation system, and thus it is our responsibility to make this system easily accessible to users who may simply log in and interact with their system on a website. To do this, there are two main sub-systems to consider: the front-end, or user interface with which the client interacts, and the back-end, which serves as a middleman or liason between local Hestia controllers and users on the website.

This document describes in detail how both of these sub-systems work, how they interact with each other, and the design choices behind the system as a whole.

## General Overview of the System
The Hestia Web Interface can be divided into two main sub-systems as mentioned in the Introduction.
* Front-end user interface, with which the user interacts
* Back-end server that connects users to their local Hestia controllers and holds user and server information

## Website Front-End
Some intro; especially front-end may deviate from initial choices/client requirements, based on further interactions.
![some text](https://github.com/RUGSoftEng/2018-Hestia-Web/blob/frontend/docs/frontend_docs/concepts/Hestia%20login%20concept.png)

### Design choices
#### Structural choices
Something about the structure of the information of the webpage; having a dash board.
Making sure that everything could be tabbed through, make it as accessible as possible (e.g. good design).
#### Aesthetical choices
Choice of colour, elements, layout of the page, logos, images, etc.
Maybe use bootstrap or something? Talk about why

## Website Back-End
