# Pushmood

## About

Pushmood is an application built as part of [Hacktoberfest 2018](https://hacktoberfest.digitalocean.com/).

The idea is very simple. You add a [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to your local repository, and now each time you run `git push`, you'll be asked a question directly in your terminal. The questions are defined by you using the [Pushmood dashboard](https://pushmood.com/questions), where you'll also find your answers beautifully plotted.

The application is built using React and Firebase.

## Usage

1. Sign in at [pushmood.com](https://pushmood.com/signin) (GitHub sign-in is supported).
2. Create a new question.
3. Install the hook in a repository of your choice using the instructions at [pushmood.com/install](https://pushmood.com/install).
4. Try it out: `git commit --allow-empty -m "Testing Pushmood && git push"
5. Check out your answer at [pushmood.com/answers](https://pushmood.com/answers).

## Installation

Pushmood is installed **per-repository**. What you do is simply to add a git hook to your `.git/hooks` directory.

The hook is unique for every user, which means that you have to go to [pushmood.com/install](https://pushmood.com/install) to get yours.

## Contributing

Feel free to open issues or submit pull requests. Follow instructions below to start coding:

1. Clone this repository.
2. `npm install`
3. `npm start`
4. Hack away

## Copyright

This project is licensed under [WTFPL](http://www.wtfpl.net/).
