import { ethers } from 'hardhat'
import { Market, Market__factory } from '../typechain'

describe('Market', () => {
    let deployer
    let marketFactory
    let market: Market

    it('deploys', async () => {
        [deployer] = await ethers.getSigners()
        marketFactory = new Market__factory(deployer)
        market = await marketFactory.deploy()
    })
})