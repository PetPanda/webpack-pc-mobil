
const fs = require('fs');
const inquirer = require('inquirer');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config.prod');

inquirer.prompt([
	{
		type: 'list',
		name: 'PLATFORM',
		message: 'Please choose build platform:',
		choices: ['web', 'mobile']
	},
	{
		type: 'list',
		name: 'ENV',
		message: 'Please choose build environment:',
		choices: ['DEV', 'PROD']
	}
]).then(answers => {
	fs.writeFileSync('./build/run-env.js', `module.exports = ${JSON.stringify(answers)};`, error => {
		if (error) {
			console.log(error);
		} else {
			console.log('env write ok!');
		}
	});
	webpack(webpackConfig, (err, stats) => {
		if (err) {
			console.log(err);
			return;
		}
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n');
	});
});