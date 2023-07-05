"use strict"

let User = require('../models/user')

exports.list_users = async function (req, res, next) {
    try{
        const data = await User.findAll();
        res.render('users', {data});
    }catch (err){
        req.flash('error', err);
        res.render('users', {data: ''});
    }    
};

exports.add_user = async function (req, res, next) {
    res.render('users/add', {
        name: '',
        email: '',
        position:''
    });
}

exports.insert_user = async function (req, res, next) {
    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let errors = false;
    if(name.length === 0 || email.length === 0) {
        errors = true;
        req.flash('error', "Please enter name and email");
        res.render('users/add', {
            name,
            email,
            position
        });
    }
    if(!errors) {
        var formData = {
            name,
            email,
            position
        }
        try{
            let newUser = new User(formData);
            await newUser.save();
            req.flash('success', 'User successfully added');
            res.redirect('/users');
        }catch (err){
            req.flash('error', err);
            res.render('users/add', formData);
        }
    }
}

exports.edit_user = async function (req, res, next) {
    let id = req.params.id;
    try{
        let data = await User.findByPk(id);
        if (data.length <= 0){
            req.flash('error', 'User not found with id = ' + id);
            res.redirect('/users');
        }else {
            res.render('users/edit', {
                title: 'Edit User', 
                id: data.id,
                name: data.name,
                email: data.email,
                position: data.position
            });
        }
    }catch (err){
        throw err;
    }
}

exports.update_user = async function (req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let errors = false;
    if(name.length === 0 || email.length === 0) {
        errors = true;
        req.flash('error', "Please enter name and email");
        res.render('users/edit', {
            id,
            name: name,
            email: email,
            position:position
        });
    }
    if( !errors ) {   
        let formData = {
            name: name,
            email: email,
            position:position
        }
        try{
            await User.update(formData, { where: {id} });
            req.flash('success', 'User successfully updated');
            res.redirect('/users');
        }catch (err){
            req.flash('error', err);
            res.render('users/edit', {
                id,
                name: formData.name,
                email: formData.email,
                position: formData.position
            });
        }
    }
}
   
exports.delete_user = async function (req, res, next) {
    let id = req.params.id;
    try{
        await User.destroy({ where: { id } });
        req.flash('success', 'User successfully deleted! ID = ' + id);
        res.redirect('/users');
    }catch (err){
        req.flash('error', err);
        res.redirect('/users');
    }
}