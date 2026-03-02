import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';    

export async function renderMailTemplate(templateId:string, params:Record<string, any>):Promise<string>{
    const templatepath= path.join(__dirname,"mailer",`${templateId}.hbs`);
    try{
        const Content= await fs.readFile(templatepath,'utf-8');
        const finalContent= Handlebars.compile(Content);
        return finalContent(params);
    }catch(err){
        throw new Error(`Failed to render template ${templateId}`);
    }
}

//This function takes parameters and templateId and returns the rendered template as a string. It reads the template file, compiles it using Handlebars, and then applies the parameters to generate the final content. If there is an error during this process, it throws an error indicating that the template rendering failed.The params in the parameter specifies the dynamic values that will be injected into the template, allowing for personalized content generation based on the provided parameters.
