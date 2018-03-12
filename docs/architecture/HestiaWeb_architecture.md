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
The *Hestia* Home Automation System, developed by the clients, aims to make home automation simple again. The local server infrastructure to facilitate communicating and controlling the various hardware to be automated has been implemented by the clients. However, aside from an Android application (also developed by the clients), the system lacks consumer side interfacing. This limits ease of use and hinders widespread usage.

To create this client side intefrace there are two main systems under consideration; the front-end, or user interface with which the client interacts, and the back-end, which serves as a middleman or liason between local Hestia controllers and users on the website.

This document describes in detail how both of these sub-systems work, how they interact with each other, and motivates the design choices underlying.


### Overview
Our goal in this project is to create the web interface. This web interface, which is hosted on a central server, should allow users to log in and connect their local Hestia servers, thereby allowing remote management.

A Hestia server is a *controller* that manages a set of *peripherals*. Those peripherals are the facilities to be automated. These could for instance be lights, locks, or any mumber of programmable devices. The reason why this is possible is because the design created by the client is peripheral independent, as the Hestia server manages that peripheral through its corresponding plugin.

The clients have created this system using the REST API. This decoupling makes the development process less complicated, as it allows for development effectively independent of the server. 

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
Webserver (main.py) and authentication


### Design decisions
Flask over PHP
	We tested PHP - Familiarity with PHP
	None with Flask/Python
	PHP might be faster than Python - not analyzed explicitly
	Scalability in Flask coupled with things such as Firebase, additionally, clients wrote Hestia in Python, using Flask (so familiar)
	This means that clients could theoretically easily extend/adapt our code

What is [Firebase](https://firebase.google.com/)?
	- 2m users
	- Authentication (provides easy auth)
	- Other stuffe
	- up to 50 users free (check); paid for more
	- this might be an issue, as the clients have no business model
There may be other viable alternatives, so we should design in such a way that switching from Firebase to alt doesn't incur large infrastructural cost.

What are the advantages/disadvantages

## Change Log

| Who            |       When  | Where          | What                                |
| :---           |       :---  | :---           | :---                                |
| Troy Harrison  |  2018-03-12 | Whole document | Created initial document.           |
| Andrew Lalis   |  2018-03-12 | Whole document | Updated content for document.       |
| Rens Nijman    |  2018-03-12 | Front-End      | Add structure for front-end section.|
| Rens Nijman    |  2018-03-12 | Back-End       | Add structure for back-end section.|
