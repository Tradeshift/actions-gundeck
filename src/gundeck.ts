import {getExecOutput} from '@actions/exec';
import {Inputs} from './inputs';

export async function run(inputs: Inputs): Promise<void> {
  const res = await getExecOutput('docker', [
    'run',
    '--rm',
    '-e',
    `HOST=${inputs.host}`,
    '-e',
    `CA=${inputs.caCert}`,
    '-e',
    `CERT=${inputs.clientCert}`,
    '-e',
    `KEY=${inputs.clientKey}`,
    '-e',
    `JOB=${inputs.job}`,
    '-e',
    `PROJECT=${inputs.project}`,
    '-e',
    `TOKEN=${inputs.token}`,
    '-e',
    `OPTIONS=${inputs.options.join(' ')}`,
    inputs.dockerImage
  ]);

  if (res.stderr !== '' && res.exitCode) {
    throw new Error(`Error running gundeck: ${res.stderr}`);
  }
}
