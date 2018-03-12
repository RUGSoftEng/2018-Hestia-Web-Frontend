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


## Website Back-End