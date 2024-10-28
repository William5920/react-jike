import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useState, useEffect } from 'react'
import { request } from '@/utils'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // 状态枚举数据
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>
  }
  // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]

  // 获取频道列表
  const [channels, setChannels] = useState([])
  async function fetchChannels() {
    const res = await request.get('/channels')
    console.log('频道数据', res)
    setChannels(res.data.channels)
  }
  // 获取表格数据
  const [article, setArticle] = useState({
    list: [],
    count: 0
  })
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    begin_pubdate: null,
    end_pubdate: null,
    status: null,
    channel_id: null
  })
  async function fetchArticleList() {
    console.log('筛选参数', params)
    const res = await request.get('/mp/articles', { params })
    console.log('表格数据', res)
    const { results, total_count } = res.data
    setArticle({
      list: results,
      count: total_count
    })
  }
  // 筛选功能
  const onFinish = formValue => {
    setParams({
      ...params,
      status: formValue.status,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date ? formValue.date[0].format('YYYY-MM-DD') : undefined,
      end_pubdate: formValue.date ? formValue.date[1].format('YYYY-MM-DD') : undefined
    })
  }
  // 分页
  const onPageChange = page => {
    setParams({
      ...params,
      page
    })
  }
  // 筛选参数变化重新获取表格数据
  useEffect(() => {
    fetchArticleList()
  }, [params])

  // 频道数据只获取一次
  useEffect(() => {
    fetchChannels()
  }, [])

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue=""
              style={{ width: 120 }}
            >
              {
                channels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到${article.count}条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={article.list} pagination={{
          total: article.count,
          pageSize: params.per_page,
          onChange: onPageChange
        }} />
      </Card>
    </div>
  )
}

export default Article