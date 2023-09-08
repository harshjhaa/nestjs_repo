import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
interface EnvironmentVariables {
  PROJECT_NAME: string;
}

@Module({
  imports: [ConfigModule.forRoot()],
})
// export class FeatureModule {
//   constructor(private configService: ConfigService<EnvironmentVariables>) {
//     const projectName = this.configService.get<string>(
//       'PROJECT_NAME',
//       'default-project-name',
//     );
//     // const url = this.configService.get('URL', { infer: true });
//   }
// }
export class FeatureModule {
  constructor(
    private configService: ConfigService<
      { PROJECT_NAME: string; URL: string },
      true
    >,
  ) {
    const projectName = this.configService.get<string>(
      'PROJECT_NAME',
      'default-project-name',
    );
    const url = this.configService.get('URL');
  }
}
