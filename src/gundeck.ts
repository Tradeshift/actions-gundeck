import {getExecOutput} from '@actions/exec';
import {Inputs} from './inputs';

export async function run(inputs: Inputs): Promise<void> {
  const res = await getExecOutput('docker', [
    'run',
    '--rm',
    '-e',
    `url=${inputs.host}`,
    '-e',
    `ca=${inputs.caCert}`,
    '-e',
    `cert=${inputs.clientCert}`,
    '-e',
    `key=${inputs.clientKey}`,
    '-e',
    `job=${inputs.job}`,
    '-e',
    `project=${inputs.project}`,
    '-e',
    `token=${inputs.token}`,
    '-e',
    `options=${inputs.options.join(' ')}`,
    inputs.dockerImage
  ]);

  if (res.stderr !== '' && res.exitCode) {
    throw new Error(`Error running gundeck: ${res.stderr}`);
  }
}
