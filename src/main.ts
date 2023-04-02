import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";


async function start (){
    const PORT =process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('урок backend')
        .setDescription('документация REST API')
        .setVersion('1.0.0')
        .addTag('sellcringe')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)
    // app.useGlobalGuards(JwtAuthGuard)
    await app.listen(PORT, () => console.log(`Server started on ${PORT}`))
}

start()