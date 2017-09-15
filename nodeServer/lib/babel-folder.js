
let path = require('path');
import { transformFile } from 'babel-core';
import fse from 'fs-extra';
import glob from "glob";


export default async (sourcePath, targetPath) => {
    const source = path.join(sourcePath, "**", "*.js");

    const transforms = await new Promise((resolve, reject) => {
        glob(source, (err,files) => {
            if(err) {
                reject(err);
            }
            resolve(files);
        });
    })

    const transformJobs = await Promise.all(transforms.map(file => 
        new Promise((resolve, reject) => {
            transformFile(file, (err, result) => {
                if(err) {
                    reject(err);
                }
                const relativeFilename = path.relative(sourcePath, file);
                resolve({
                    relativeFilename,
                    ...result
                })
            })
        })
    ))

    const results = await Promise.all(transformJobs.map(result => {
        const outputFilename = path.join(targetPath,result.relativeFilename);
        return fse.outputFile(outputFilename, result.code);
    }))
}