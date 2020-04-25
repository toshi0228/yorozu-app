import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Spin } from 'antd';
import styles from './index.module.scss';

const ImageForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  // 画像がドロップされたとき動く関数
  const onDrop = useCallback((acceptedFiles) => {
    setIsLoading(true);
    // props.setImage(acceptedFiles);

    // 画像をロードする関数
    loadImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  const loadImage = (file) => {
    setTimeout(() => {
      props.setImage(file);
      setIsLoading(false);
    }, 1000);
  };

  const files = props.image.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div {...getRootProps()} className={styles.back}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>ここにファイルをドロップ・ドロップしてください</p>
        ) : (
          <p>
            ここにファイルをドラッグするか、
            <br />
            クリックしてファイルを選択してください
          </p>
        )}
      </div>
      {files}
      {/* // isLoadingがtureならspinタグを返す*/}
      {isLoading && <Spin />}
    </>
  );
};

export default ImageForm;
