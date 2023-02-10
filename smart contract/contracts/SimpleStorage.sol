pragma solidity ^0.8.17;

contract SimpleStorage{
    uint256 data;

    event returnData(uint data);

    function updateData(uint _data) external{
        data = _data;
    }

    function readData() external returns(uint256){      
      emit returnData(data);
      return data;
    }

}

