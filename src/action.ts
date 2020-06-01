// Copyright (c) 2020 Luca Cappa
// Released under the term specified in file LICENSE.txt
// SPDX short identifier: MIT

import * as libaction from '@lukka/run-cmake-vcpkg-action-libs';
import * as core from '@actions/core'
import * as vcpkgAction from './vcpkg-action';

export const VCPKGDIRECTORIESKEY = 'vcpkgDirectoryKey';

async function main(): Promise<void> {
  try {
    const actionLib = new libaction.ActionLib();
    libaction.setBaseLib(actionLib);
    const action = new vcpkgAction.VcpkgAction(actionLib);
    await action.run();
    core.info('run-vcpkg action execution succeeded');
    process.exitCode = 0;
  } catch (err) {
    const errorAsString = (err ?? "undefined error").toString();
    core.debug('Error: ' + errorAsString);
    core.setFailed(`run-vcpkg action execution failed: ${errorAsString}`);
    process.exitCode = -1000;
  }
}

// Main entry point of the task.
main().catch(error => console.error("main() failed!", error));
