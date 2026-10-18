---
title: Setting up a Github user page from scratch with Jekyll
description: "Free hosting on username.github.io: set up Ruby, Git and Jekyll on Windows, pick a theme and publish."
date: 2020-07-10
tags: [jekyll, github, pages, ruby]
archive:
  site: dev.to
  url: https://dev.to/wapenshaw/guide-setting-up-a-github-user-page-from-scratch-with-jekyll-7f5
---

## Features & Benefits

- Free Hosting on Github.io
- Hosted on username.github.io subdomain
- Jekyll gives you the speed and simplicity of hosting your home or your application page.
- Configurable with themes

## Requirements

1. [Github account](https://github.com/join)
2. [Ruby 2.6.\*, Ruby Devkit](https://rubyinstaller.org/downloads/)
3. [Git](https://git-scm.com/downloads)
4. [VSCode](https://code.visualstudio.com/) or any other preferred editor
5. [GCC, G++](https://jmeubank.github.io/tdm-gcc/download/) and [Make](https://gcc.gnu.org/install/)
6. [Chocolately](https://chocolatey.org) for simpler installation of required components

## Github Setup

### Creating a github account

1. Goto to the Github [sign up](https://github.com/join) page and create an account with your preferred username. **The username you choose here will be the subdomain on which your site will be hosted.**
2. Now that you have created an account and setup your profile (not required) you are ready to create repositories on that account.
3. Create a repository in your newly created account with the name **username.github.io**. Do not initiate the repository with a readme yet.

![Create a Repository](/blog/github-user-page-with-jekyll/8m8z0b7i0lwfazo9veyu.png)

You are done on Github for now. We will get back after setting up our local environment.

(_Note: You cannot publish your github pages if you set the repository to "Private". To use GitHub pages on a private repository, you need the [PRO](https://github.com/pricing) plan. If you have bought a jekyll theme, you might be required to make the repository private, check with your vendor._)

## Ruby Setup

### Installing Ruby

1. Download and install using the Ruby Installer available [Here](https://rubyinstaller.org/downloads/), As of writing this guide Ruby 2.6.x is the preferred version as 2.7.x has compatibility issues with some gems that are needed to be installed via bundle. **_Make sure you download the installer named Ruby+Devkit 2.6.x_**

      - You can also do this via [Chocolatey](https://chocolatey.org/) using these commands
      - `choco install ruby --version=2.6.5.1`
      - `choco install ruby.devkit`

2. Or Follow the [Jekyll Docs](https://jekyllrb.com/docs/installation/) to complete the installation of basic environment (`Ruby`, `RubyGems` and `Bundler`).
3. Install [GCC, G++](https://jmeubank.github.io/tdm-gcc/download/) and [Make](https://gcc.gnu.org/install/), just use the default settings.
      - Even better get [Chocolately](https://chocolatey.org) to install them with
      - `choco install make`
      - `choco install mingw`

4) To verify everything has been installed and setup properly use the following commands\
   `ruby -v` | `gem -v` | `gcc --version` | `g++ --version` | `make --version`

5) If everything went according to plan, your terminal should look like this

![Ruby Check](/blog/github-user-page-with-jekyll/mvx7a2ybubj9yym4m8d0.png)

## Git Setup

### Installation

1. Download [Git installer](https://git-scm.com/downloads) and start the git installer.
2. Use the default settings unless you specifically want something to be different.
3. _Adjusting your PATH environment_, keep the default, **"Use Git from the command line and also from 3rd-party software"**. This option will allow you to use Git from either Git Bash or the Windows Command Prompt / Powershell.
4. Once you have finished installation, open a CMD(Command Promt)/PS(Powershell) window. Type in `git --version` to verify
5. If you prefer the bash terminal, your start menu should have a **Git Bash** entry in it.

### Configuration

1. Now to configure the installed instance of git with your Github Account.
2. In PS/CMD/Bash shell type in
      - `git config --global user.username "<your name>"`
      - `git config --global user.email "<your e-mail>"`
      - _(username = the account you created & email = email associated with that account)_
3. We are done for now.

## Jekyll Setup

### Installation

For a comprehensive guide on how to start a jekyll site from scratch follow the directions on the [Jekyll Website - Installation](https://jekyllrb.com/docs/installation/)

1. For this guide we are gonna do a bit of cheating to get setup as quickly as possible.
2. Open up a shell, and type in `gem install jekyll bundler`
3. Check installation by typing in `jekyll -v`

### Configuration and Setup

1. We will start with a theme of your choice which you can download at:
      - [jamstackthemes.dev](https://jamstackthemes.dev/ssg/jekyll/)
      - [jekyllthemes.org](http://jekyllthemes.org/)
      - [jekyllthemes.io](https://jekyllthemes.io/)
      - [jekyll-theme.com](https://jekyll-themes.com/)
2. Select a Theme which you like to use. For example for this site I have chosen the [Chirpy Theme](https://github.com/cotes2020/jekyll-theme-chirpy). Make sure you have the layout and page structure the way you want it.
3. Once you have selected your theme, either download the zip file or save the github repository URL.
4. Open up a shell again and naviage to the path where you want to create a folder for your new website
5. If using windows explorer, create a folder and extract all the files from your theme file into that folder, make sure the GEMFILE file in the path foldername
6. If using a shell, Create a folder with `mkdir foldername`
7. Change Directory to the newly created folder `cd foldername`
8. If you havent extracted the files, you can check out the file from the github repo, this is preferred.
9. Remember the theme's github repository url? Now is the time to use it.
10. Clone the repository to your foldername using `git clone repository-URL-you-just-copied.git -b master`
11. Now your foldername should look something similar to this

![Directory List](/blog/github-user-page-with-jekyll/hzagmd9yiryqalu0wdnk.png)

### Setting up remote git repo

1. Go back to the shell you were using, make sure its currently in foldername/
2. Initialilze git in that folder with\
   `git init`\
   This will initialize your foldername/ as a git repository
3. In your browser go to your git hub repository and copy the URL of YOUR REPOSITORY. When you created the repository in your account. It should look like this\ `https://github.com/username/username.github.io.git`
4. Add this URL as a remote\
   `git remote add origin https://github.com/username/username.github.io.git`
5. Your Git repository is set for now and the remote is configured so when you commit the files and push, they will be added to your repository.

### Jekyll Final Steps

1. Back to the shell you were using, time to install everything needed for your jekyll website.
2. Type in `bundle install` when you are in foldername/
3. This will automatically install all the Jekyll plugins and dependencies that are listed in the Gemfile.
4. If you are using Ruby 2.6.x you shouldn't get any errors. If there are dependeny errors, check the version numbers and install the needed ones.
5. Now open the \_config.yml file and modify the settings according to your needs, the important ones are:
      1. `url: 'https://username.github.io'` (if you are hosting it to the username.github.io repository)
      2. `baseurl: ''` (not required for this instance)
6. Type in `bundle exec jekyll serve` This will launch a webserver and host your website locally at [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

### Commiting and pushing everything to Github

1. After you have made all the changes in the configuration and other pages, it is now time to push all the files to Github
2. Check git status, this will show you which files are unstaged: `git status`
3. Add all files to staging: `git add .`
4. Commit the files to the branch: `git commit -m Initial Commit`
5. Push the commit to the remote repository (github repo) `git push origin master`
6. Now visit your github repository page at https://github.com/username/username.github.io and verify the files are uploaded
7. Wait a minute or two and visit https://username.github.io and the pages will appear!

## Maintenance

When you make changes to your website from now these are the steps to follow,

1. check everything is working fine with: `bundle exec jekyll serve` and visiting `http://127.0.0.1:4000/`
2. Add all changed files to staging with: `git add .`
3. Commit changes to the branch: `git commit -m "my commit message"`
4. Push the commit to the remote (github) repository with: `git push origin master`
