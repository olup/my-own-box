My Own Box
============

A small, fast and self hosted web based cloud server, with a minimal client included.

Think of it as a mini personnal dropbox, super simple to use.

My Own Box lets you turn any folder into a simple file REST API, in one command only. 

Access it from anywhere : no need to do anything, NGROK creates a tunnel to your cloud and quatrieme-gauche.ga provides you with a stable static url ! All of this for free !!!!

A small client is integrated too, so that you can start using MOB straight away.

**Great for editing a static file blog, have a quick web folder to keep your files with you (but away from the NSA or Google), or to edit your code on the go**

## Usage

```
npm install https://github.com/olup/my-own-box.git
```

Then just navigate to the folder you wish to open to the world. Type in your console : `myownbox`

And VOILA ! 

## Configuration

Add a myownbox-confing.yml file at the root of your clouded folder to add some customization. If not present, the file will be created on first start.

### Users

The configuration file lets you protect the cloud with user accounts. Each account can also have a separate root folder to provide them with separated space

### Scripts

You can add scripts to the configuration file, to execute them from anywhere. Very usefull, for example, to rebuild your static site. Right now, scripts are always executed from the root folder where myownbox was called