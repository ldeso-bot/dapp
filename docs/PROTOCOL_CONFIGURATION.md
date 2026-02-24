# Purpose

This document aims to describe the steps to reconfigure the subgraph and the dApp in case the protocol addresses change.

# Prerequisites

- Access to Goldsky: https://app.goldsky.com/project_cmgzise2h00195np2gbp35g3d/dashboard/subgraphs
- Write access to the cm-subgraphs repository: https://github.com/Carbonmark/cm-subgraphs
- Write access to the dApp repository: https://github.com/KlimaDAO/dapp
- A friend to validate merge requests

# Subgraph

- Clone the cm-subgraphs repository: https://github.com/Carbonmark/cm-subgraphs
- Update the network addresses: https://github.com/Carbonmark/cm-subgraphs/blob/main/graphs/protocol/networks.json
- Make a pull request, have it validated and merged to main
- Follow the instructions here to deploy and promote the subgraph version: https://github.com/Carbonmark/cm-subgraphs/blob/main/README.md#goldsky

# dApp

- Clone the dApp repository: https://github.com/KlimaDAO/dapp
- Update the contract addresses:
  - Here: https://github.com/KlimaDAO/dapp/blob/staging/src/shared/constants/contracts.constants.ts#L16
  - and here: https://github.com/KlimaDAO/dapp/blob/staging/src/scripts/build-abis/diamond-facets.config.json#L7
- Make a pull request, have it validated and merged to staging
