import AppModule from '../lib/App.js';
// 管理全局唯一统一的背景播放器
const audio = wx.getBackgroundAudioManager();

export default class AudioManager{

  // 使用静态变量保存，方便后续代码
  static audio = audio;

  // 当前播放音乐
  static song = {};

  // 当前所播放的歌单
  static songs = [];

  // 设置当前播放的歌曲歌单
  static setSong(song,songs){


    // 播放器的属性
    const audioAttr = {
      src: song.url, // 歌曲url
      title: song.name, // 歌曲名称
      singer: song.singer,  // 歌手名称
      coverImgUrl: song.cover // 封面
    };

    AudioManager.saveSong(song)

    // 设置到 audio 播放器上 如果设置了src 会自动播放
    Object.assign(audio,audioAttr);
  }

  static saveSong(song,songs){
    AppModule.assign({ song });
  }

  // 构造方法
  constructor(){}
}
